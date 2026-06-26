import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Film } from '../../../models/film';
import { FilmService } from '../../../services/film.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-film-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './film-dialog.component.html',
  styleUrl: './film-dialog.component.css'

})
export class FilmDialogComponent {
  public flag!: number;

  constructor(
    public dialogRef: MatDialogRef<FilmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Film,
    private filmService: FilmService,
    private snackBar: MatSnackBar
  ) { }

  public proveriLogiku(): void {
    if (this.flag === 1) {
      const noviFilm: Film = {
        id: 0,
        naziv: this.data.naziv,
        zanr: this.data.zanr,
        trajanje: this.data.trajanje,
        recenzija: this.data.recenzija
      };

      this.filmService.create(noviFilm).subscribe({
        next: () => {

          this.snackBar.open(
            'Film je uspešno dodat.',
            'Zatvori',
            { duration: 3000 }
          );

          this.dialogRef.close(1);
        },
        error: (err: any) => console.error('Greška pri dodavanju filma:', err)
      });
    } else if (this.flag === 2) {
      const izmenjeniFilm: Film = {
        id: this.data.id,
        naziv: this.data.naziv,
        zanr: this.data.zanr,
        trajanje: this.data.trajanje,
        recenzija: this.data.recenzija
      };

      this.filmService.update(izmenjeniFilm).subscribe({
        next: () => {

          this.snackBar.open(
            'Film je uspešno izmenjen.',
            'Zatvori',
            { duration: 3000 }
          );

          this.dialogRef.close(1);
        },
        error: (err: any) => console.error('Greška pri izmeni filma:', err)
      });
    } else if (this.flag === 3) {
      this.filmService.delete(Number(this.data.id)).subscribe({
        next: () => {
          this.snackBar.open(
            'Film je uspešno obrisan.',
            'Zatvori',
            { duration: 3000 }
          );

          this.dialogRef.close(1);
        },
        error: (err: any) => {

          if (err.status === 409) {

            this.snackBar.open(
              'Nije moguće obrisati film jer postoje aktivne rezervacije za njega!',
              'Zatvori',
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            );

          } else {

            console.error('Greška pri brisanju filma:', err);

            this.snackBar.open(
              'Došlo je do greške pri brisanju filma.',
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