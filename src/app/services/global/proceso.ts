import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  
  private procesoSubject = new BehaviorSubject<string>('');
  proceso$ = this.procesoSubject.asObservable();

  setProceso(proceso: string) {
    this.procesoSubject.next(proceso);
  }

  getProceso() {
    return this.procesoSubject.value;
  }
}
