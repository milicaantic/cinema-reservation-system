import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms';
import { Rezervacija } from '../../../models/rezervacija';
import { Film } from '../../../models/film';
import { Sala } from '../../../models/sala';
import { RezervacijaService } from '../../../services/rezervacija.service';
import { FilmService } from '../../../services/film.service';
import { SalaService } from '../../../services/sala.service';

@Component({
  selector: 'app-rezervacija-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatCheckboxModule, 
    FormsModule
  ],
  templateUrl: './rezervacija-dialog.component.html'
})
export class RezervacijaDialogComponent implements OnInit {
  public flag!: number;
  public filmovi: Film[] = [];
  public sale: Sala[] = [];

  constructor(
    public dialogRef: MatDialogRef<RezervacijaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rezervacija,
    private rezervacijaService: RezervacijaService,
    private filmService: FilmService,
    private salaService: SalaService
  ) { }

  ngOnInit(): void {

    if (this.flag === 1) {
      this.data.placeno = false;
    }

    if (this.data && this.data.datum) {
      const proveraDatuma = String(this.data.datum);
      if (proveraDatuma.includes('T') && proveraDatuma.length > 16) {
        this.data.datum = proveraDatuma.substring(0, 16) as any;
      }
    }

    this.filmService.getAll().subscribe({
      next: (res) => this.filmovi = res,
      error: (err: any) => console.error(err)
    });

    this.salaService.getAll().subscribe({
      next: (res) => this.sale = res,
      error: (err: any) => console.error(err)
    });
  }

  public compareFilmove(o1: Film, o2: Film): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  public compareSale(o1: Sala, o2: Sala): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  public proveriLogiku(): void {

    const statusPlacanja = !!this.data.placeno;

    if (this.flag === 1) {
      const novaRezervacija = { 
        ...this.data, 
        id: 0,
        placeno: statusPlacanja,
      };

      this.rezervacijaService.create(novaRezervacija as any).subscribe({
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri dodavanju rezervacije:', err)
      });
    } else if (this.flag === 2) {
      const izmenjenaRezervacija = {
        ...this.data,
        placeno: statusPlacanja,
        Placeno: statusPlacanja
      };

      this.rezervacijaService.update(izmenjenaRezervacija as any).subscribe({
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri izmeni rezervacije:', err)
      });
    } else if (this.flag === 3) {
      this.rezervacijaService.delete(Number(this.data.id)).subscribe({
        next: () => this.dialogRef.close(1),
        error: (err: any) => console.error('Greška pri brisanju rezervacije:', err)
      });
    }
  }

  public ponisti(): void {
    this.dialogRef.close();
  }
}