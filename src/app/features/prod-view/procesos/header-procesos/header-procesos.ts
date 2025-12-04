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
import { DarkModeService } from 'app/services/dark-mode-service';

@Component({
  selector: 'app-header-procesos',
  imports: [FormsModule, CommonModule, RouterModule,  MatButtonModule,Fecha, Equipos, Procesos],
  templateUrl: './header-procesos.html',
  styleUrl: './header-procesos.css',
})
export class HeaderProcesos {

  equipos: Servidor[] = [];
  procesos: Maquina[] = [];

  equipoSeleccionado!: Servidor;
  procesoSeleccionado!: Maquina;

  @Output() equipoSeleccionadoChange = new EventEmitter<Servidor>();
  @Output() procesoSeleccionadoChange = new EventEmitter<Maquina>();
  @Output() descargarGrafico = new EventEmitter<void>();

  constructor(
    private servidoresService: ServidoresService,
    private maquinasService: MaquinasService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.cargarServidores();
  }

  // Función local para cargar el Select de equipos
  cargarServidores(): void {
    this.servidoresService.getServidores().subscribe((servidores: Servidor[]) => {
      this.equipos = servidores.filter(s => s.habilitado);
      
      if (this.equipos.length > 0) {
        this.equipoSeleccionado = this.equipos[0];
        this.equipoSeleccionadoChange.emit(this.equipoSeleccionado);
        this.cargarProcesos(this.equipoSeleccionado);
      }
    });
  }

  // Función local para cargar el Select de procesos
  cargarProcesos(equipo: Servidor): void {
    this.maquinasService.getMaquinas(equipo.codigo).subscribe((maquinas: Maquina[]) => {
      this.procesos = maquinas;
      if (this.procesos.length > 0) {
        if (this.procesos[0].codMaq != "") {
          this.procesoSeleccionado= this.procesos[0];
          this.procesoSeleccionadoChange.emit(this.procesoSeleccionado);
        }
      }
    });
  }

  // Función local para recargar el Select de procesos cuando cambie el Select de equipos
  onEquipoChange(nuevoEquipo: Servidor): void {
    this.equipoSeleccionadoChange.emit(nuevoEquipo);
    this.cargarProcesos(nuevoEquipo);
  }

  toggleTheme() {
    this.darkModeService.toggle();
  }

}
