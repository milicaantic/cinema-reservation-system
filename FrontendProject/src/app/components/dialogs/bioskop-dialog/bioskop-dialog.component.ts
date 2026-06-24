import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Bioskop } from '../../../models/bioskop'; 
import { BioskopService } from '../../../services/bioskop.service'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bioskop-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './bioskop-dialog.component.html'
})
export class BioskopDialogComponent {
  public flag!: number;

  constructor(
    public dialogRef: MatDialogRef<BioskopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bioskop,
    private bioskopService: BioskopService ,
    private snackBar: MatSnackBar
  ) { }

  public proveriLogiku(): void {
    if (this.flag === 1) {
      const noviBioskop: Bioskop = {
        id: 0,
        naziv: this.data.naziv,
        adresa: this.data.adresa,
      };

      this.bioskopService.create(noviBioskop).subscribe({
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri dodavanju:', err)
      });
      
    } else if (this.flag === 2) {
      const izmenjeniBioskop: Bioskop = {
        id: this.data.id,
        naziv: this.data.naziv,
        adresa: this.data.adresa,
      };

      this.bioskopService.update(izmenjeniBioskop).subscribe({
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri izmeni:', err)
      });
      
} else if (this.flag === 3) {
  this.bioskopService.delete(Number(this.data.id)).subscribe({
    next: () => this.dialogRef.close(1),
    error: (err: any) => {
      console.error('Greška pri brisanju bioskopa:', err);
      
      this.snackBar.open(
        'Nije moguće obrisati bioskop jer u njemu još uvek postoje sale!', 
        'Zatvori', 
        { duration: 5000 }
      );
    }
  });
}
  }

  public ponisti(): void {
    this.dialogRef.close();
  }
}