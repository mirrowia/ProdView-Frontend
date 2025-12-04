import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablaDatos } from './tabla-datos/tabla-datos';
import { CommonModule } from '@angular/common';
import { HeaderEstadisticas } from './header-estadisticas/header-estadisticas';


@Component({
  selector: 'app-estadisticas',
  imports: [FormsModule,TablaDatos, CommonModule, HeaderEstadisticas],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas {


}