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

  equiposProduccion: string[] = [];
  equipoSeleccionado!: string;

  constructor(
    private servidoresService: ServidoresService,
    private equipoService: EquipoService
  ) {}

  ngOnInit(): void {
    this.cargarServidores();
  }

  cargarServidores(): void {
    this.servidoresService.getServidores().subscribe((servidores: Servidor[]) => {
      const habilitados = servidores.filter(s => s.habilitado);
      this.equiposProduccion = habilitados.map(s => s.nombre);

      if (this.equiposProduccion.length > 0) {
        this.equipoSeleccionado = this.equiposProduccion[0];
        this.equipoService.setEquipo(this.equipoSeleccionado);
      }
    });
  }

  onCambioEquipo(equipo: string) {
    this.equipoSeleccionado = equipo;
    this.equipoService.setEquipo(equipo);
  }

}
