import { Routes } from '@angular/router';
import { BioskopComponent } from './components/main/bioskop/bioskop.component';
import { FilmComponent } from './components/main/film/film.component';
import { SalaComponent } from './components/main/sala/sala.component';
import { RezervacijaComponent } from './components/main/rezervacija/rezervacija.component';
import { HomeComponent } from './components/utility/home/home.component';
import { AboutComponent } from './components/utility/about/about.component';
import { AuthorComponent } from './components/utility/author/author.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'bioskop', component: BioskopComponent },
  { path: 'film', component: FilmComponent },
  { path: 'sala', component: SalaComponent },
  { path: 'rezervacija', component: RezervacijaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
