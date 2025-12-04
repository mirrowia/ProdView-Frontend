import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Dato } from 'app/models/dato';
import { Servidor } from 'app/models/servidor';
import { DatosService } from 'app/services/datos';
import { EquipoService } from 'app/services/global/equipo';
import { FechaService } from 'app/services/global/fecha';
import { TurnoService } from 'app/services/global/turno';
import { catchError, combineLatest, finalize, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-datos',
  imports: [CommonModule],
  templateUrl: './tabla-datos.html',
  styleUrl: './tabla-datos.css',
})
export class TablaDatos {

  datos: Dato[] = [];
  private subs: Subscription = new Subscription();
  equipo!: Servidor;
  turno!: string;
  fecha!: Date;
  loading: boolean = false;

  constructor(
    private datosService: DatosService,
    private fechaService: FechaService,
    private equipoService: EquipoService,
    private turnoService: TurnoService,
  ) {}

  ngOnInit(): void {
    
    this.subs.add(
      combineLatest([
        this.equipoService.equipo$,
        this.turnoService.turno$,
        this.fechaService.fecha$
      ]).subscribe(([equipo, turno, fecha]) => {
        this.equipo = equipo;
        this.turno = turno;
        this.fecha = fecha;
        if (equipo && turno) {
          if(equipo.codigo != ""){
            this.loading = true;
            this.datos = [];
            this.cargarDatos();
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

cargarDatos(): void {
  this.datosService
    .getDatos(this.equipo.codigo, this.turno, this.fecha)
    .pipe(
      catchError(err => {
        console.error(err);
        return of([]); // fallback elegante
      }),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(data => {
      this.datos = data;
    });
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
