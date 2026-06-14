import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Rezervacija } from '../../../models/rezervacija'; 
import { RezervacijaService } from '../../../services/rezervacija.service';
import { RezervacijaDialogComponent } from '../../dialogs/rezervacija-dialog/rezervacija-dialog.component';

@Component({
  selector: 'app-app-rezervacija',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './rezervacija.component.html',
  styleUrl: './rezervacija.component.css'
})
export class RezervacijaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'datum', 'brojOsoba', 'cenaKarte', 'placeno', 'film', 'sala', 'actions'];
  dataSource: Rezervacija[] = [];

  constructor(
    private rezervacijaService: RezervacijaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajRezervacije();
  }

  ucitajRezervacije(): void {
    this.rezervacijaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  formatirajDatum(lepiDatum: any): string {
    if (!lepiDatum) return 'Nije postavljen';
    
    const tekstDatuma = String(lepiDatum);
    
    if (tekstDatuma.startsWith('+0000') || tekstDatuma.startsWith('0000')) {
      return 'Nevažeći datum';
    }

    try {
      const d = new Date(tekstDatuma);
      if (isNaN(d.getTime())) {
        return 'Nevažeći datum';
      }
      
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

  otvoriDialog(flag: number, rezervacija?: Rezervacija): void {
    const dialogRef = this.dialog.open(RezervacijaDialogComponent, {
      data: flag === 1 ? {} as Rezervacija : { ...rezervacija },
      width: '400px'
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ucitajRezervacije();
      }
    });
  }
}