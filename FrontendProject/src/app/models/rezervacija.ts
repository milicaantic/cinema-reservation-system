import { Film } from './film';
import { Sala } from './sala';

export interface Rezervacija {
  id: number;
  brojOsoba: number;
  cenaKarte: number;
  datum: string;
  placeno: boolean;
  film: Film;
  sala: Sala;
}