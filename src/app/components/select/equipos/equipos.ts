import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Servidor } from 'app/models/servidor';
import { EquipoService } from 'app/services/global/equipo';
import { ServidoresService } from 'app/services/servidores';

@Component({
  selector: 'app-equipos',
  imports: [CommonModule, FormsModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
export class Equipos {

  equiposProduccion: Servidor[] = [];
  equipoSeleccionado!: Servidor;

  constructor(
    private servidoresService: ServidoresService,
    private equipoService: EquipoService
  ) {}

  ngOnInit(): void {
    this.cargarServidores();
  }

  cargarServidores(): void {
    this.servidoresService.getServidores().subscribe((servidores: Servidor[]) => {
      this.equiposProduccion = servidores.filter(s => s.habilitado);

      if (this.equiposProduccion.length > 0) {
        this.equipoSeleccionado = this.equiposProduccion[0];
        this.equipoService.setEquipo(this.equipoSeleccionado);
      }
    });
  }

  onCambioEquipo(equipo: Servidor) {
    this.equipoSeleccionado = equipo;
    this.equipoService.setEquipo(equipo);
  }

}
