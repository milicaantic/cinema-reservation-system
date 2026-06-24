import { Component, OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
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




@Component({
  selector: 'app-app-rezervacija',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule,
    MatDialogModule,MatSortModule,MatPaginatorModule,MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './rezervacija.component.html',
  styleUrl: './rezervacija.component.css'
})
export class RezervacijaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'datum', 'brojOsoba', 'cenaKarte', 'placeno', 'film', 'sala', 'actions'];
   dataSource = new MatTableDataSource<Rezervacija>([]);
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('sortRezervacije') sortRezervacije!: MatSort;

  constructor(
    private rezervacijaService: RezervacijaService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajRezervacije();
  }
  
pretraziPlaceno(vrednost: string) {
  if (vrednost === '') {
    this.ucitajRezervacije();
    return;
  }

  const jePlaceno = vrednost === 'true';

  this.rezervacijaService
    .findByPlaceno(jePlaceno)
    .subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Greška pri pretrazi statusa plaćanja:', err)
    });
}

pretraziBrojOsoba(broj:string){

  if(broj === ''){
    this.ucitajRezervacije();
    return;
  }

  this.rezervacijaService
      .findByBrojOsoba(Number(broj))
      .subscribe(data=>{
        this.dataSource.data=data;
      });
}
pretraziDatumSaDatepickera(izabraniDatum: Date | null) {
  if (!izabraniDatum) {
    this.ucitajRezervacije();
    return;
  }

  const godina = izabraniDatum.getFullYear();
  const mesec = String(izabraniDatum.getMonth() + 1).padStart(2, '0');
  const dan = String(izabraniDatum.getDate()).padStart(2, '0');
  const formatiranDatumString = `${godina}-${mesec}-${dan}`;

  this.rezervacijaService
    .findByDatum(formatiranDatumString)
    .subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Greška pri pretrazi datuma:', err)
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

  let data: Rezervacija;

  if (flag === 1) {
    data = {
      id: 0,
      datum: new Date(),
      brojOsoba: 0,
      cenaKarte: 0,
      placeno: false,
      film: null as any,
      sala: null as any
    };
  } else {
    data = {
      ...rezervacija!,
      datum: new Date(rezervacija!.datum as any)
    };
  }

  const dialogRef = this.dialog.open(RezervacijaDialogComponent, {
    data: data,
    width: '400px',
     panelClass: 'custom-dialog'
  });

  dialogRef.componentInstance.flag = flag;

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.ucitajRezervacije();
    }
  });
}
}