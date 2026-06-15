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

@Component({
  selector: 'app-bioskop',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatIconModule, MatButtonModule,
    MatDialogModule, MatSortModule, MatPaginatorModule
  ],
  templateUrl: './bioskop.component.html',
  styleUrls: ['./bioskop.component.css']
})
export class BioskopComponent implements OnInit {
  displayedColumns: string[] = ['id', 'naziv', 'adresa', 'actions'];
  dataSource = new MatTableDataSource<Bioskop>([]);
  @ViewChild('paginatorBioskop') paginatorBioskop!: MatPaginator;

  saleColumns: string[] = ['id', 'kapacitet', 'brojRedova', 'actions'];
  dataSourceSale = new MatTableDataSource<Sala>([]);
  @ViewChild('paginatorSale') paginatorSale!: MatPaginator;

  selektovaniBioskop: Bioskop | null = null;

  constructor(
    private bioskopService: BioskopService,
    private salaService: SalaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajBioskope();
  }

  ucitajBioskope(): void {
    this.bioskopService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginatorBioskop;
      }
    });
  }

  izaberiBioskop(bioskop: Bioskop): void {
    this.selektovaniBioskop = bioskop;
    this.salaService.getAll().subscribe({
      next: (sveSale) => {
        this.dataSourceSale.data = sveSale.filter(s => s.bioskop?.id === bioskop.id);
        this.dataSourceSale.paginator = this.paginatorSale;
        this.cdr.detectChanges();
      }
    });
  }

  otvoriDialog(flag: number, bioskop?: Bioskop): void {
    const dialogRef = this.dialog.open(BioskopDialogComponent, {
      data: flag === 1 ? {} as Bioskop : { ...bioskop },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) this.ucitajBioskope();
    });
  }

  otvoriDialogSalu(flag: number, sala?: Sala): void {
    const dialogRef = this.dialog.open(SalaDialogComponent, {
      data: flag === 1 ? { bioskop: this.selektovaniBioskop } : { ...sala },
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