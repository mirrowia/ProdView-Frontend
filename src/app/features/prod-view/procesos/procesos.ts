import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Grafico } from './grafico/grafico';
import { HeaderProcesos } from './header-procesos/header-procesos';
import { Servidor } from 'app/models/servidor';
import { Maquina } from 'app/models/maquina';

@Component({
  selector: 'app-procesos',
  imports: [ FormsModule, CommonModule, HeaderProcesos, Grafico],
  templateUrl: './procesos.html',
  styleUrl: './procesos.css',
})
export class Procesos {

  // Propiedades vinculadas a ngModel
  equipoSeleccionado: Servidor = {
    codigo: '',
    nombre: '',
    direccionIp: '',
    puerto: 0,
    habilitado: true
  };
  procesoSeleccionado: Maquina = {
    codMaq: '',
    descripcion: '',
    vIdeal: 0,
    graficable: true,
    tecla: 0
  };

  // Se ejecuta cuando HeaderProcesos emite cambio de equipo
  onEquipoChange(nuevoEquipo: Servidor): void {    
    this.equipoSeleccionado = nuevoEquipo;
  }
  
  // Se ejecuta cuando HeaderProcesos emite cambio de turno
  onProcesoChange(nuevoProceso: Maquina): void {
    this.procesoSeleccionado = nuevoProceso;
  }

}
