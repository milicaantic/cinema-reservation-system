import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BioskopService } from './services/bioskop.service';
import { FilmService } from './services/film.service';
import { SalaService } from './services/sala.service';
import { RezervacijaService } from './services/rezervacija.service';

import { Bioskop } from './models/bioskop';
import { Film } from './models/film';
import { Sala } from './models/sala';
import { Rezervacija } from './models/rezervacija';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('FrontendProject');

  bioskopi: Bioskop[] = [];
  filmovi: Film[] = [];
  sale: Sala[] = [];
  rezervacije: Rezervacija[] = [];

constructor(
    private bioskopService: BioskopService,
    private filmService: FilmService,
    private salaService: SalaService,
    private rezervacijaService: RezervacijaService
  ) {}
  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.bioskopService.getAll().subscribe(data => this.bioskopi = data);

    this.filmService.getAll().subscribe(data => this.filmovi = data);

    this.salaService.getAll().subscribe(data => this.sale = data);

    this.rezervacijaService.getAll().subscribe(data => this.rezervacije = data);
  }
}