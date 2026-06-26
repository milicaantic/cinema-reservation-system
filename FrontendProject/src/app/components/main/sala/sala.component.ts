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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule],
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  kapacitetFilter = '';
  brojRedovaFilter = '';
  displayedColumns: string[] = ['id', 'kapacitet', 'brojRedova', 'bioskop', 'actions'];
  dataSource = new MatTableDataSource<Sala>([]);
  @ViewChild('paginatorSale') paginatorSale!: MatPaginator;
  @ViewChild('sortSale') sortSale!: MatSort;

  rezervacijeColumns: string[] = ['id', 'datum', 'brojOsoba', 'cenaKarte', 'film', 'status', 'actions'];
  dataSourceRezervacije = new MatTableDataSource<Rezervacija>([]);
  @ViewChild('paginatorRez') paginatorRez!: MatPaginator;
  @ViewChild('sortRezervacije') sortRezervacije!: MatSort;

  selektovanaSala: Sala | null = null;

  constructor(
    private salaService: SalaService,
    private rezervacijaService: RezervacijaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ucitajSale();
  }

  pretraziKapacitet() {

    this.selektovanaSala = null;
    this.dataSourceRezervacije.data = []

    this.brojRedovaFilter = '';

    const vrednost = Number(this.kapacitetFilter);

    if (vrednost > 1000) {
      this.kapacitetFilter = "1000";
    } else if (vrednost < 1) {
      this.kapacitetFilter = "";
    } else {
      this.kapacitetFilter = vrednost.toString();;
    }

    if (!this.kapacitetFilter) {
      this.ucitajSale();
      return;
    }

    this.salaService
      .findByKapacitet(Number(this.kapacitetFilter))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => console.error(err)
      });

  }

  pretraziBrojRedova() {

    this.selektovanaSala = null;
    this.dataSourceRezervacije.data = []

    this.kapacitetFilter = '';

    const vrednost = Number(this.brojRedovaFilter);

    if (vrednost > 100) {
      this.brojRedovaFilter = "100";
    } else if (vrednost < 1) {
      this.brojRedovaFilter = "";
    } else {
      this.brojRedovaFilter = vrednost.toString();;
    }

    if (!this.brojRedovaFilter) {
      this.ucitajSale();
      return;
    }

    this.salaService
      .findByBrojRedova(Number(this.brojRedovaFilter))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => console.error(err)
      });
  }

  ucitajSale(): void {
    this.salaService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginatorSale;
        this.dataSource.sort = this.sortSale;
      },
      error: (err) => console.error(err)
    });
  }

  izaberiSalu(sala: Sala): void {
    this.selektovanaSala = sala;
    this.rezervacijaService.findBySalaId(sala.id).subscribe({
  next: (sveRezervacije) => {
    this.dataSourceRezervacije.data = sveRezervacije;
        this.dataSourceRezervacije.paginator = this.paginatorRez;
        this.dataSourceRezervacije.sort = this.sortRezervacije;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  otvoriDialog(flag: number, sala?: Sala): void {
    const dialogRef = this.dialog.open(SalaDialogComponent, {
      data: flag === 1 ? {} : { ...sala },
      width: '400px'
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => { if (result === 1) this.ucitajSale(); });
  }


  formatirajDatum(datum: any): string {

    if (!datum) return 'Nije postavljen';

    const d = new Date(datum);

    if (isNaN(d.getTime())) {
      return 'Nevažeći datum';
    }

    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}.`;
  }

  otvoriDialogRezervaciju(flag: number, rez?: Rezervacija): void {
    if (flag === 2 && rez) {
      const datum = new Date(rez.datum as any);
      if (datum < new Date()) {
        this.snackBar.open('Nije moguće izmeniti rezervaciju iz prošlosti!', 'Zatvori', { duration: 3000 });
        return;
      }
    }

    const dialogRef = this.dialog.open(RezervacijaDialogComponent, {
      data: flag === 1
        ? {
          sala: this.selektovanaSala,
          placeno: false,
          fromSala: true
        }
        : {
          ...rez,
          fromSala: true
        },
      width: '400px'
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1 && this.selektovanaSala) this.izaberiSalu(this.selektovanaSala);
    });
  }
}