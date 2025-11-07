import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Maquina } from 'app/models/maquina';
import { Servidor } from 'app/models/servidor';
import { MaquinasService } from 'app/services/maquinas';
import { ServidoresService } from 'app/services/servidores';
import { MatButtonModule } from '@angular/material/button';
import { Fecha } from 'app/components/fecha/fecha';
import { Equipos } from 'app/components/select/equipos/equipos';
import { Procesos } from 'app/components/select/procesos/procesos';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-procesos',
  imports: [FormsModule, CommonModule, RouterModule,  MatButtonModule,Fecha, Equipos, Procesos],
  templateUrl: './header-procesos.html',
  styleUrl: './header-procesos.css',
})
export class HeaderProcesos {

  equipos: string[] = [];
  procesos: string[] = [];

  equipoSeleccionado!: string;
  procesoSeleccionado!: string;

  @Output() equipoSeleccionadoChange = new EventEmitter<string>();
  @Output() procesoSeleccionadoChange = new EventEmitter<string>();

  constructor(
    private servidoresService: ServidoresService,
    private maquinasService: MaquinasService
  ) {}

  ngOnInit(): void {
    this.cargarServidores();
  }

  // Función local para cargar el Select de equipos
  cargarServidores(): void {
    this.servidoresService.getServidores().subscribe((servidores: Servidor[]) => {
      const habilitados = servidores.filter(s => s.habilitado);
      this.equipos = habilitados.map(s => s.nombre);
      
      if (this.equipos.length > 0) {
        this.equipoSeleccionado = this.equipos[0];
        this.equipoSeleccionadoChange.emit(this.equipoSeleccionado);
        this.cargarProcesos(this.equipoSeleccionado);
      }
    });
  }

  // Función local para cargar el Select de procesos
  cargarProcesos(equipo: string): void {
    this.maquinasService.getMaquinas(equipo).subscribe((maquinas: Maquina[]) => {
      this.procesos = maquinas.map(m => m.descripcion);
      if (this.procesos.length > 0) {
        this.procesoSeleccionado = this.procesos[0];
        this.procesoSeleccionadoChange.emit(this.procesoSeleccionado);
      }
    });
  }

  // Función local para recargar el Select de procesos cuando cambie el Select de equipos
  onEquipoChange(nuevoEquipo: string): void {
    this.equipoSeleccionadoChange.emit(nuevoEquipo);
    this.cargarProcesos(nuevoEquipo);
  }

}
