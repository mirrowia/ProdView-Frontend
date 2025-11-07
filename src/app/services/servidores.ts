import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servidor } from '../models/servidor';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServidoresService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getServidores(): Observable<Servidor[]> {
    return this.http.get<Servidor[]>(`${this.apiBase}/servidor/`);
  }
}
