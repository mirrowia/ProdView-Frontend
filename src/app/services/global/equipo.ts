import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private equipoSubject = new BehaviorSubject<string>('');
  equipo$ = this.equipoSubject.asObservable();

  setEquipo(equipo: string) {
    this.equipoSubject.next(equipo);
  }

  getEquipo() {
    return this.equipoSubject.value;
  }
  
}
