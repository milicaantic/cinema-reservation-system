import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Rezervacija } from '../../../models/rezervacija';
import { RezervacijaService } from '../../../services/rezervacija.service';
import { RezervacijaDialogComponent } from '../../dialogs/rezervacija-dialog/rezervacija-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-app-rezervacija',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, MatSortModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './rezervacija.component.html',
  styleUrl: './rezervacija.component.css'
})
export class RezervacijaComponent implements OnInit {
  brojOsobaFilter = '';
  datumFilter: Date | null = null;
  placenoFilter = '';
  displayedColumns: string[] = ['id', 'datum', 'brojOsoba', 'cenaKarte', 'placeno', 'film', 'sala', 'actions'];
  dataSource = new MatTableDataSource<Rezervacija>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('sortRezervacije') sortRezervacije!: MatSort;

  constructor(
    private rezervacijaService: RezervacijaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ucitajRezervacije();
  }

  pretraziPlaceno() {

    this.brojOsobaFilter = '';
    this.datumFilter = null;

    if (this.placenoFilter === '') {
      this.ucitajRezervacije();
      return;
    }

    const jePlaceno = this.placenoFilter === 'true';

    this.rezervacijaService
      .findByPlaceno(jePlaceno)
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  pretraziBrojOsoba() {

    this.placenoFilter = '';
    this.datumFilter = null;

    if (!this.brojOsobaFilter) {
      this.ucitajRezervacije();
      return;
    }


    this.rezervacijaService
      .findByBrojOsoba(Number(this.brojOsobaFilter))
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }
  pretraziDatumSaDatepickera() {

    this.brojOsobaFilter = '';
    this.placenoFilter = '';

    if (!this.datumFilter) {
      this.ucitajRezervacije();
      return;
    }


    const godina = this.datumFilter.getFullYear();
    const mesec = String(this.datumFilter.getMonth() + 1).padStart(2, '0');
    const dan = String(this.datumFilter.getDate()).padStart(2, '0');

    const datum = `${godina}-${mesec}-${dan}`;


    this.rezervacijaService
      .findByDatum(datum)
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  ucitajRezervacije(): void {
    this.rezervacijaService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortRezervacije;
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


      return `${dan}.${mesec}.${godina}.`;
    } catch (e) {
      return 'Nevažeći datum';
    }
  }
  otvoriDialog(flag: number, rezervacija?: Rezervacija): void {
    if (flag === 2 && rezervacija) {
      const datum = new Date(rezervacija.datum as any);
      if (datum < new Date()) {
        this.snackBar.open('Nije moguće izmeniti rezervaciju iz prošlosti!', 'Zatvori', { duration: 3000 });
        return;
      }
    }

    let data: Rezervacija;
    if (flag === 1) {
      data = { id: 0, datum: new Date(), brojOsoba: 0, cenaKarte: 0, placeno: false, film: null as any, sala: null as any };
    } else {
      data = { ...rezervacija!, datum: new Date(rezervacija!.datum as any) };
    }

    const dialogRef = this.dialog.open(RezervacijaDialogComponent, {
      data: data, width: '400px', panelClass: 'custom-dialog'
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => { if (result === 1) this.ucitajRezervacije(); });
  }
}