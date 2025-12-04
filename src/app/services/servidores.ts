import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servidor } from '../models/servidor';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServidoresService {
  private apiBase = environment.apiBaseUrlProd;

  constructor(private http: HttpClient) {}

  getServidores(): Observable<Servidor[]> {
    return this.http.get<Servidor[]>(`${this.apiBase}/servidor/`);
  }

  saveServidor(servidor: Servidor): Observable<Servidor> {
    return this.http.post<Servidor>(`${this.apiBase}/servidor/`, servidor);
  }

  updateServidor(codigo: string, servidor: Servidor): Observable<Servidor> {
    return this.http.put<Servidor>(`${this.apiBase}/servidor/${codigo}`, servidor);
  }
}
