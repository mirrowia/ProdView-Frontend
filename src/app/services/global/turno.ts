import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnoSubject = new BehaviorSubject<string>('');
  turno$ = this.turnoSubject.asObservable();

  setTurno(turno: string) {
    this.turnoSubject.next(turno);
  }

  getTurno() {
    return this.turnoSubject.value;
  }
  
}
