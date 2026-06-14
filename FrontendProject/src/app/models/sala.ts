import { Bioskop } from './bioskop';

export interface Sala {
  id: number;
  kapacitet: number;
  brojRedova: number;
  bioskop: Bioskop;
}