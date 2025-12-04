import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dato } from 'app/models/dato';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private apiBase = environment.apiBaseUrlProd;

  constructor(private http: HttpClient) {}

  getDatos(equipo: string, turno: string, fecha: Date): Observable<Dato[]> {
    const fechaStr = `${fecha.getFullYear()}-${(fecha.getMonth()+1)
      .toString().padStart(2,'0')}-${fecha.getDate().toString().padStart(2,'0')}T${fecha.getHours().toString().padStart(2,'0')}:${fecha.getMinutes().toString().padStart(2,'0')}:${fecha.getSeconds().toString().padStart(2,'0')}`;

    const params = new HttpParams()
      .set('turno', turno)
      .set('fecha', fechaStr);
    
    // Encode del path variable para evitar problemas con caracteres especiales
    const equipoEncoded =  encodeURIComponent(equipo.replace("/", "%2F"));

    return this.http.get<Dato[]>(`${this.apiBase}/dato/${equipoEncoded}/datos`, { params });
  }
}