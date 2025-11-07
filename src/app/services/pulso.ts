import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pulso } from 'app/models/pulso';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PulsoService {

  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPulsos(equipo: string, proceso: string, fecha: Date): Observable<Pulso[]> {
    const fechaStr = `${fecha.getFullYear()}-${(fecha.getMonth()+1)
      .toString().padStart(2,'0')}-${fecha.getDate().toString().padStart(2,'0')}T${fecha.getHours().toString().padStart(2,'0')}:${fecha.getMinutes().toString().padStart(2,'0')}:${fecha.getSeconds().toString().padStart(2,'0')}`;
    
    const params = new HttpParams()
      .set('proceso', proceso)
      .set('fecha', fechaStr);

    // Encode del path variable para evitar problemas con caracteres especiales
    const equipoEncoded =  encodeURIComponent(equipo.replace("/", "%2F"));

    return this.http.get<Pulso[]>(`${this.apiBase}/pulso/${equipoEncoded}/pulsos`, { params });
  }
}
