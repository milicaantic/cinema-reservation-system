import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';       
import { MatButtonModule } from '@angular/material/button';     
import { Film } from '../../../models/film'; 
import { FilmService } from '../../../services/film.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FilmDialogComponent } from '../../dialogs/film-dialog/film-dialog.component';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent implements OnInit {
  displayedColumns: string[] = ['id', 'naziv', 'zanr', 'trajanje', 'recenzija', 'actions'];
  dataSource: Film[] = [];

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
        this.dataSource = data;
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