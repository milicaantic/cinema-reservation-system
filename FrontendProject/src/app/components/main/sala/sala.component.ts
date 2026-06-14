import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Sala } from '../../../models/sala'; 
import { Rezervacija } from '../../../models/rezervacija'; 
import { SalaService } from '../../../services/sala.service';
import { RezervacijaService } from '../../../services/rezervacija.service'; 
import { SalaDialogComponent } from '../../dialogs/sala-dialog/sala-dialog.component';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule 
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'kapacitet', 'brojRedova', 'bioskop', 'actions'];
  dataSource: Sala[] = [];

  rezervacijeColumns: string[] = ['id', 'datum', 'brojOsoba', 'cenaKarte', 'film', 'status'];
  rezervacijeZaSalu: Rezervacija[] = [];
  selektovanaSala: Sala | null = null;

  constructor(
    private salaService: SalaService,
    private rezervacijaService: RezervacijaService, 
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajSale();
  }

  ucitajSale(): void {
    this.salaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  izaberiSalu(sala: Sala): void {
    this.selektovanaSala = sala;
    
    this.rezervacijaService.getAll().subscribe({
      next: (sveRezervacije) => {
        this.rezervacijeZaSalu = sveRezervacije.filter(r => r.sala && r.sala.id === sala.id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Greška pri učitavanju rezervacija za salu:', err)
    });
  }

  formatirajDatum(lepiDatum: any): string {
    if (!lepiDatum) return 'Nije postavljen';
    const tekstDatuma = String(lepiDatum);
    if (tekstDatuma.startsWith('+0000') || tekstDatuma.startsWith('0000')) return 'Nevažeći datum';

    try {
      const d = new Date(tekstDatuma);
      if (isNaN(d.getTime())) return 'Nevažeći datum';
      const dan = String(d.getDate()).padStart(2, '0');
      const mesec = String(d.getMonth() + 1).padStart(2, '0');
      const godina = d.getFullYear();
      const sati = String(d.getHours()).padStart(2, '0');
      const minuti = String(d.getMinutes()).padStart(2, '0');
      return `${dan}.${mesec}.${godina}. u ${sati}:${minuti}h`;
    } catch (e) {
      return 'Nevažeći datum';
    }
  }

  otvoriDialog(flag: number, sala?: Sala): void {
    const dialogRef = this.dialog.open(SalaDialogComponent, {
      data: flag === 1 ? {} as Sala : { ...sala },
      width: '400px'
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ucitajSale();
        this.selektovanaSala = null; 
      }
    });
  }
}