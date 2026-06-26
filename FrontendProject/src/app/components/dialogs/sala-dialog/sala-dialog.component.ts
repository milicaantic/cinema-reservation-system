import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Sala } from '../../../models/sala';
import { Bioskop } from '../../../models/bioskop';
import { SalaService } from '../../../services/sala.service';
import { BioskopService } from '../../../services/bioskop.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-sala-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './sala-dialog.component.html',
  styleUrl: './sala-dialog.component.css'

})
export class SalaDialogComponent implements OnInit {
  public flag!: number;
  public bioskopi: Bioskop[] = [];
  public fromBioskop = false;

  constructor(
    public dialogRef: MatDialogRef<SalaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sala,
    private salaService: SalaService,
    private bioskopService: BioskopService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if ((this.data as any).fromBioskop) {
      this.fromBioskop = true;
    }
    this.bioskopService.getAll().subscribe({
      next: (res) => {
        this.bioskopi = res,
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  public compareObjects(o1: Bioskop, o2: Bioskop): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  public proveriLogiku(): void {
    if (this.flag === 1) {
      const novaSala: Sala = {
        id: 0,
        kapacitet: this.data.kapacitet,
        brojRedova: this.data.brojRedova,
        bioskop: this.data.bioskop
      };

      this.salaService.create(novaSala).subscribe({
        next: () => {

          this.snackBar.open(
            'Sala je uspešno dodata.',
            'Zatvori',
            { duration: 3000 }
          );

          this.dialogRef.close(1);
        },
        error: (err: any) => console.error('Greška pri dodavanju sale:', err)
      });
    } else if (this.flag === 2) {
      const izmenjenaSala: Sala = {
        id: this.data.id,
        kapacitet: this.data.kapacitet,
        brojRedova: this.data.brojRedova,
        bioskop: this.data.bioskop
      };

      this.salaService.update(izmenjenaSala).subscribe({
        next: () => {

          this.snackBar.open(
            'Sala je uspešno izmenjena.',
            'Zatvori',
            { duration: 3000 }
          );

          this.dialogRef.close(1);
        },
        error: (err: any) => console.error('Greška pri izmeni sale:', err)
      });
    } else if (this.flag === 3) {
      this.salaService.delete(Number(this.data.id)).subscribe({
        next: () => {
          this.snackBar.open(
            'Sala je uspešno obrisana.',
            'Zatvori',
            { duration: 3000 }
          );

          this.dialogRef.close(1);
        },
        error: (err: any) => {
          console.error('Greška pri brisanju sale:', err);

          if (err.status === 409) {

            this.snackBar.open(
              'Nije moguće obrisati salu jer postoje aktivne projekcije ili rezervacije!',
              'Zatvori',
              { duration: 5000 }
            );

          } else {

            this.snackBar.open(
              'Došlo je do greške pri brisanju sale.',
              'Zatvori',
              { duration: 3000 }
            );
          }
        }
      });
    }
  }

  public ponisti(): void {
    this.dialogRef.close();
  }
}