import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { RezervacijaDialogComponent } from '../../dialogs/rezervacija-dialog/rezervacija-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, MatSortModule, MatPaginatorModule],
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'kapacitet', 'brojRedova', 'bioskop', 'actions'];
  dataSource = new MatTableDataSource<Sala>([]);
  @ViewChild('paginatorSale') paginatorSale!: MatPaginator;

  rezervacijeColumns: string[] = ['id', 'datum', 'brojOsoba', 'cenaKarte', 'film', 'status', 'actions'];
  dataSourceRezervacije = new MatTableDataSource<Rezervacija>([]);
  @ViewChild('paginatorRez') paginatorRez!: MatPaginator;

  selektovanaSala: Sala | null = null;

  constructor(
    private salaService: SalaService,
    private rezervacijaService: RezervacijaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void { this.ucitajSale(); }

  ucitajSale(): void {
    this.salaService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginatorSale;
    });
  }

  formatirajDatum(datum: any): string {
    if (!datum) return '';
    return new Date(datum).toLocaleDateString('sr-RS');
  }

  izaberiSalu(sala: Sala): void {
    this.selektovanaSala = sala;
    this.rezervacijaService.getAll().subscribe(sveRezervacije => {
      this.dataSourceRezervacije.data = sveRezervacije.filter(r => r.sala?.id === sala.id);
      this.dataSourceRezervacije.paginator = this.paginatorRez;
      this.cdr.detectChanges();
    });
  }

  otvoriDialogSalu(flag: number, sala?: Sala): void {
    const dialogRef = this.dialog.open(SalaDialogComponent, { 
      data: flag === 1 ? {} : { ...sala }, 
      width: '400px' 
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => { if (result === 1) this.ucitajSale(); });
  }

  otvoriDialogRezervaciju(flag: number, rez?: Rezervacija): void {
    const dialogRef = this.dialog.open(RezervacijaDialogComponent, {
      data: flag === 1 ? { sala: this.selektovanaSala } : { ...rez },
      width: '400px'
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1 && this.selektovanaSala) this.izaberiSalu(this.selektovanaSala);
    });
  }
}