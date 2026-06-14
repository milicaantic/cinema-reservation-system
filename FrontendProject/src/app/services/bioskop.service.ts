import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bioskop } from '../models/bioskop';

@Injectable({
  providedIn: 'root'
})
export class BioskopService {

  private apiUrl = 'http://localhost:8080/bioskop';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bioskop[]> {
    return this.http.get<Bioskop[]>(this.apiUrl);
  }

  getById(id: number): Observable<Bioskop> {
    return this.http.get<Bioskop>(`${this.apiUrl}/${id}`);
  }

  create(bioskop: Bioskop): Observable<Bioskop> {
    return this.http.post<Bioskop>(this.apiUrl, bioskop);
  }

  update(bioskop: Bioskop): Observable<Bioskop> {
    return this.http.put<Bioskop>(this.apiUrl, bioskop);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}