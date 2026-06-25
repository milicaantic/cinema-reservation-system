import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {
  private apiUrl = 'http://localhost:8080/rezervacija';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Rezervacija[]> {
    return this.http.get<Rezervacija[]>(this.apiUrl);
  }

  getById(id: number): Observable<Rezervacija> {
    return this.http.get<Rezervacija>(`${this.apiUrl}/${id}`);
  }

  create(rezervacija: Rezervacija): Observable<Rezervacija> {
    return this.http.post<Rezervacija>(this.apiUrl, rezervacija);
  }

  update(rezervacija: Rezervacija): Observable<Rezervacija> {
    return this.http.put<Rezervacija>(this.apiUrl, rezervacija);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  findByPlaceno(placeno: boolean) {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/placeno/${placeno}`
    );
  }

  findByDatum(datum: string) {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/datum/${datum}`
    );
  }

  findByBrojOsoba(brojOsoba: number) {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/osobe/${brojOsoba}`
    );
  }
}