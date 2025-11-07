import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablaDatos } from './tabla-datos/tabla-datos';
import { CommonModule } from '@angular/common';
import { HeaderEstadisticas } from './header-estadisticas/header-estadisticas';


@Component({
  selector: 'app-estadisticas-turno',
  imports: [FormsModule,TablaDatos, CommonModule, HeaderEstadisticas],
  templateUrl: './estadisticas-turno.html',
  styleUrl: './estadisticas-turno.css',
})
export class EstadisticasTurno {


}