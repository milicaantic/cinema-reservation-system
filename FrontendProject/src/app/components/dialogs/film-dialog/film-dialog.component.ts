import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Film } from '../../../models/film';
import { FilmService } from '../../../services/film.service';

@Component({
  selector: 'app-film-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule
  ],
  templateUrl: './film-dialog.component.html'
})
export class FilmDialogComponent {
  public flag!: number;

  constructor(
    public dialogRef: MatDialogRef<FilmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Film,
    private filmService: FilmService
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
        next: () => this.dialogRef.close(1),
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
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri izmeni filma:', err)
      });
    } else if (this.flag === 3) {
      this.filmService.delete(Number(this.data.id)).subscribe({
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri brisanju filma:', err)
      });
    }
  }

  public ponisti(): void {
    this.dialogRef.close();
  }
}