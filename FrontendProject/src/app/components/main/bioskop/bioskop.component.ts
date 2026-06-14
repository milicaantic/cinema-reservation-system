import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'app-bioskop',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule,     
    BioskopDialogComponent 
  ],
  templateUrl: './bioskop.component.html',
  styleUrl: './bioskop.component.css'
})
export class BioskopComponent implements OnInit {
  displayedColumns: string[] = ['id', 'naziv', 'adresa', 'mesto', 'actions'];
  dataSource: Bioskop[] = [];

  saleColumns: string[] = ['id', 'kapacitet', 'brojRedova'];
  saleZaBioskop: Sala[] = [];
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
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  izaberiBioskop(bioskop: Bioskop): void {
    this.selektovaniBioskop = bioskop;
    
    this.salaService.getAll().subscribe({
      next: (sveSale) => {
        this.saleZaBioskop = sveSale.filter(s => s.bioskop && s.bioskop.id === bioskop.id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Greška pri učitavanju sala za bioskop:', err)
    });
  }

  otvoriDialog(flag: number, bioskop?: Bioskop): void {
    const dialogRef = this.dialog.open(BioskopDialogComponent, {
      data: flag === 1 ? {} as Bioskop : { ...bioskop },
      width: '400px'
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ucitajBioskope();
        this.selektovaniBioskop = null;
      }
    });
  }
}