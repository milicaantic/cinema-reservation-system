import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = 'http://localhost:8080/film';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  getById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/${id}`);
  }

  create(film: Film): Observable<Film> {
    return this.http.post<Film>(this.apiUrl, film);
  }

  update(film: Film): Observable<Film> {
    return this.http.put<Film>(this.apiUrl, film);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}