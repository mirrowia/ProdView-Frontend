import { Injectable } from '@angular/core';
import { Maquina } from 'app/models/maquina';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  
  private procesoSubject = new BehaviorSubject<Maquina>({
    codMaq: '',
    descripcion: '',
    vIdeal: 0,
    graficable: true,
    tecla: 0
  });
  proceso$ = this.procesoSubject.asObservable();

  setProceso(proceso: Maquina) {
    this.procesoSubject.next(proceso);
  }

  getProceso() {
    return this.procesoSubject.value;
  }
}
