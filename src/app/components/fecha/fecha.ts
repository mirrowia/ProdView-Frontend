import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FechaService } from 'app/services/global/fecha';

@Component({
  selector: 'app-fecha',
  imports: [CommonModule],
  templateUrl: './fecha.html',
  styleUrl: './fecha.css',
})
export class Fecha {

  editandoFecha: boolean = false;
  fechaSeleccionada!: Date;

  constructor(private fechaService: FechaService) {}

  ngOnInit(): void {
    this.fechaSeleccionada = this.fechaService.getFecha();

    // Escuchamos cambios globales (si otro componente cambia la fecha)
    this.fechaService.fecha$.subscribe(fecha => this.fechaSeleccionada = fecha);
  }

  // Convierte la fecha a formato "YYYY-MM-DDTHH:mm" compatible con datetime-local
  fechaLocal(): string {
    if (!this.fechaSeleccionada) return '';
    const yyyy = this.fechaSeleccionada.getFullYear();
    const mm = (this.fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
    const dd = this.fechaSeleccionada.getDate().toString().padStart(2, '0');
    const hh = this.fechaSeleccionada.getHours().toString().padStart(2, '0');
    const min = this.fechaSeleccionada.getMinutes().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  // Guardar fecha al salir o presionar Enter
  guardarFecha(event: any): void {
    const nuevaFecha = event.target.value ? new Date(event.target.value) : new Date();
    this.fechaSeleccionada = nuevaFecha;
    this.fechaService.setFecha(nuevaFecha);
    this.editandoFecha = false;
  }

    // Función local para formatear fechas
    formatoFecha(fecha: string | Date): string {
      const f = typeof fecha === 'string' ? new Date(fecha) : fecha;
    
      const dd = f.getDate().toString().padStart(2, '0');
      const mm = (f.getMonth() + 1).toString().padStart(2, '0');
      const yyyy = f.getFullYear();
      const hh = f.getHours().toString().padStart(2, '0');
      const min = f.getMinutes().toString().padStart(2, '0');
    
      return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    }

}
