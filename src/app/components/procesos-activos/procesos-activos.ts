import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Grafico } from './grafico/grafico';
import { HeaderProcesos } from './header-procesos/header-procesos';

@Component({
  selector: 'app-procesos-activos',
  imports: [ FormsModule, CommonModule, HeaderProcesos, Grafico],
  templateUrl: './procesos-activos.html',
  styleUrl: './procesos-activos.css',
})
export class ProcesosActivos {

  // Propiedades vinculadas a ngModel
  equipoSeleccionado: string = '';
  procesoSeleccionado: string = '';

  // Se ejecuta cuando HeaderProcesos emite cambio de equipo
  onEquipoChange(nuevoEquipo: string): void {
    this.equipoSeleccionado = nuevoEquipo;
  }
  
  // Se ejecuta cuando HeaderProcesos emite cambio de turno
  onProcesoChange(nuevoProceso: string): void {
    this.procesoSeleccionado = nuevoProceso;

  }

}
