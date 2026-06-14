import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private apiUrl = 'http://localhost:8080/sala';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }

  getById(id: number): Observable<Sala> {
    return this.http.get<Sala>('${this.apiUrl}/${id}');
  }

  create(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(this.apiUrl, sala);
  }

  update(sala: Sala): Observable<Sala> {
    return this.http.put<Sala>(this.apiUrl, sala);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>('${this.apiUrl}/${id}');
  }
}