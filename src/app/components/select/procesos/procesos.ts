import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Maquina } from 'app/models/maquina';
import { EquipoService } from 'app/services/global/equipo';
import { ProcesoService } from 'app/services/global/proceso';
import { MaquinasService } from 'app/services/maquinas';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-procesos',
  imports: [CommonModule, FormsModule],
  templateUrl: './procesos.html',
  styleUrl: './procesos.css',
})
export class Procesos {

  procesos: string[] = [];
  procesoSeleccionado!: string;
  private subs = new Subscription();

  constructor(
    private procesoService: ProcesoService,
    private equipoService: EquipoService,
    private maquinasService: MaquinasService
  ) {}


  
  ngOnInit(): void {
    // Suscribirse a los cambios del equipo seleccionado
    this.subs.add(
      this.equipoService.equipo$.subscribe((equipo) => {
        if (equipo) {
          this.cargarProcesos(equipo);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  cargarProcesos(equipo: string): void {
    this.maquinasService.getMaquinas(equipo).subscribe((maquinas: Maquina[]) => {
      this.procesos = maquinas.map(m => m.descripcion);
      if (this.procesos.length > 0) {
        this.procesoSeleccionado = this.procesos[0];
        this.procesoService.setProceso(this.procesoSeleccionado);
      }
    });
  }

  onCambioProceso(proceso: string): void {
    this.procesoSeleccionado = proceso;
    this.procesoService.setProceso(proceso);
  }
  
}
