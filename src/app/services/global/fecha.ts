import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechaService {


  private fechaSubject = new BehaviorSubject<Date>(new Date());
  fecha$ = this.fechaSubject.asObservable(); // Observable público

  getFecha(): Date {
    return this.fechaSubject.value;
  }

  setFecha(fecha: Date): void {
    this.fechaSubject.next(fecha);
  }

  // Función para formatear fechas
  formatoFecha(fecha: string | Date): string {
    const f = typeof fecha === 'string' ? new Date(fecha) : fecha;
  
    const dd = f.getDate().toString().padStart(2, '0');
    const mm = (f.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = f.getFullYear();
    const hh = f.getHours().toString().padStart(2, '0');
    const min = f.getMinutes().toString().padStart(2, '0');
  
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  }
  
}
