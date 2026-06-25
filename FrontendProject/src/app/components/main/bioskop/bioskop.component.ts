import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Bioskop } from '../../../models/bioskop';
import { Sala } from '../../../models/sala';
import { BioskopService } from '../../../services/bioskop.service';
import { SalaService } from '../../../services/sala.service';
import { BioskopDialogComponent } from '../../dialogs/bioskop-dialog/bioskop-dialog.component';
import { SalaDialogComponent } from '../../dialogs/sala-dialog/sala-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bioskop',
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
    FormsModule
  ],
  templateUrl: './bioskop.component.html',
  styleUrls: ['./bioskop.component.css']
})

export class BioskopComponent implements OnInit {
  nazivFilter = '';
  adresaFilter = '';
  displayedColumns: string[] = ['id', 'naziv', 'adresa', 'actions'];
  dataSource = new MatTableDataSource<Bioskop>([]);
  @ViewChild('paginatorBioskop') paginatorBioskop!: MatPaginator;
  @ViewChild('sortBioskop') sortBioskop!: MatSort;


  saleColumns: string[] = ['id', 'kapacitet', 'brojRedova', 'actions'];
  dataSourceSale = new MatTableDataSource<Sala>([]);
  @ViewChild('paginatorSale') paginatorSale!: MatPaginator;
  @ViewChild('sortSale') sortSale!: MatSort;

  selektovaniBioskop: Bioskop | null = null;

  constructor(
    private bioskopService: BioskopService,
    private salaService: SalaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ucitajBioskope();
  }

  pretraziNaziv() {

    this.selektovaniBioskop = null;
    this.dataSourceSale.data = [];

    this.adresaFilter = '';

    if (this.nazivFilter.trim() === '') {
      this.ucitajBioskope();
      return;
    }


    this.bioskopService.findByNaziv(this.nazivFilter)
      .subscribe({
        next: (data) => { this.dataSource.data = data; },
        error: (err) => console.error(err)
      });
  }

  pretraziAdresu() {

    this.selektovaniBioskop = null;
    this.dataSourceSale.data = [];

    this.nazivFilter = '';

    if (this.adresaFilter.trim() === '') {
      this.ucitajBioskope();
      return;
    }

    this.bioskopService.findByAdresa(this.adresaFilter)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => console.error(err)
      });
  }

  ucitajBioskope(): void {
    this.bioskopService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginatorBioskop;
        this.dataSource.sort = this.sortBioskop;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)

    });
  }

  izaberiBioskop(bioskop: Bioskop): void {
    this.selektovaniBioskop = bioskop;
    this.salaService.getAll().subscribe({
      next: (sveSale) => {
        this.dataSourceSale.data = sveSale.filter(s => s.bioskop?.id === bioskop.id);
        this.dataSourceSale.paginator = this.paginatorSale;
        this.dataSourceSale.sort = this.sortSale;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  otvoriDialog(flag: number, bioskop?: Bioskop): void {

    const dialogRef =

      this.dialog.open(BioskopDialogComponent, {
        data: flag === 1 ? {} as Bioskop : { ...bioskop },
        width: '400px'
      });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ucitajBioskope();
      }
    });
  }

  otvoriDialogSalu(flag: number, sala?: Sala): void {
    const dialogRef = this.dialog.open(SalaDialogComponent, {
    data: {
      ...(flag === 1
        ? { bioskop: this.selektovaniBioskop }
        : { ...sala }),
      fromBioskop: true
    },
    width: '400px'
  });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1 && this.selektovaniBioskop) {
        this.izaberiBioskop(this.selektovaniBioskop);
      }
    });
  }

}