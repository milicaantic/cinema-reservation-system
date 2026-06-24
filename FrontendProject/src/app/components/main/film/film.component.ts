import { Component, OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';       
import { MatButtonModule } from '@angular/material/button';     
import { Film } from '../../../models/film'; 
import { FilmService } from '../../../services/film.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FilmDialogComponent } from '../../dialogs/film-dialog/film-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule,MatSortModule,MatPaginatorModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent implements OnInit {
  displayedColumns: string[] = ['id', 'naziv', 'zanr', 'trajanje', 'recenzija', 'actions'];
 dataSource = new MatTableDataSource<Film>([]);

 @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('sortFilm') sortFilm!: MatSort;
  constructor(
    private filmService: FilmService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajFilmove();
  }

  ucitajFilmove(): void {
    this.filmService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortFilm;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

 
  otvoriDialog(flag: number, film?: Film): void {
    const dialogRef = this.dialog.open(FilmDialogComponent, {
      data: flag === 1 ? {} as Film : { ...film },
      width: '400px'
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ucitajFilmove();
      }
    });
}
}