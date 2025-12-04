import { Injectable } from '@angular/core';
import { Servidor } from 'app/models/servidor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private equipoSubject = new BehaviorSubject<Servidor>({
    codigo: '',
    nombre: '',
    direccionIp: '',
    puerto: 0,
    habilitado: true
  });
  equipo$ = this.equipoSubject.asObservable();

  setEquipo(equipo: Servidor) {
    this.equipoSubject.next(equipo);
  }

  getEquipo() {
    return this.equipoSubject.value;
  }
  
}
