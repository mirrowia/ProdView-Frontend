import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Fecha } from 'app/components/fecha/fecha';
import { Equipos } from 'app/components/select/equipos/equipos';
import { Turnos } from 'app/components/select/turnos/turnos';
import { DarkModeService } from 'app/services/dark-mode-service';

@Component({
  selector: 'app-header-estadisticas',
  imports: [CommonModule, RouterModule, FormsModule, Fecha,Equipos,Turnos],
  templateUrl: './header-estadisticas.html',
  styleUrl: './header-estadisticas.css',
})
export class HeaderEstadisticas {

  constructor(private darkModeSerive: DarkModeService){}

  toggleTheme() {
    this.darkModeSerive.toggle();
  }
}
