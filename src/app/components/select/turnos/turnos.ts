import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TurnoService } from 'app/services/global/turno';

@Component({
  selector: 'app-turnos',
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css',
})
export class Turnos {

  turnos: string[] = ['Mañana', 'Tarde', 'Noche', 'Completo'];
  turnoSeleccionado!: string;

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.turnoSeleccionado = this.turnos[0];
    this.turnoService.setTurno(this.turnoSeleccionado);
  }

  onCambioTurno(turno: string) {
    this.turnoSeleccionado = turno;
    this.turnoService.setTurno(turno);
  }

}
