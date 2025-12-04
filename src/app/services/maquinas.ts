import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maquina } from 'app/models/maquina';
import { Servidor } from 'app/models/servidor';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {
  private apiBase = environment.apiBaseUrlProd;

  constructor(private http: HttpClient) {}

  getMaquinas(equipo: string): Observable<Maquina[]> {   
    const equipoParam = equipo.replace("/", "%2F");
    return this.http.get<Maquina[]>(`${this.apiBase}/maquina/${encodeURIComponent(equipoParam)}`);
  }

  getVelocidadIdeal(equipo: string, proceso: string): Observable<number> {
    
    const equipoParam = equipo.replace("/", "%2F");
    const procesoParam = proceso.replace("/", "%2F");
    return this.http.get<number>(`${this.apiBase}/maquina/velocidad-ideal/${encodeURIComponent(equipoParam)}/${encodeURIComponent(procesoParam)}`);
  }

    updateMaquina(codigo: string, maquina: Maquina): Observable<Maquina> {
      return this.http.put<Maquina>(`${this.apiBase}/maquina/${codigo}`, maquina);
    }
}
