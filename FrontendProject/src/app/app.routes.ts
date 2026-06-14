import { Routes } from '@angular/router';
import { BioskopComponent } from './components/main/bioskop/bioskop.component';
import { FilmComponent } from './components/main/film/film.component';
import { SalaComponent } from './components/main/sala/sala.component';
import { RezervacijaComponent } from './components/main/rezervacija/rezervacija.component';

export const routes: Routes = [{ path: 'bioskop', component: BioskopComponent },
  { path: 'film', component: FilmComponent },
  { path: 'sala', component: SalaComponent },
  { path: 'rezervacija', component: RezervacijaComponent },
  { path: '', redirectTo: '/bioskop', pathMatch: 'full' }
  ];
