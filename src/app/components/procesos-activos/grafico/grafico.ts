import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Pulso } from 'app/models/pulso';
import { EquipoService } from 'app/services/global/equipo';
import { FechaService } from 'app/services/global/fecha';
import { ProcesoService } from 'app/services/global/proceso';
import { PulsoService } from 'app/services/pulso';
import { combineLatest, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MaquinasService } from 'app/services/maquinas';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.html',
  styleUrls: ['./grafico.css']
})
export class Grafico implements AfterViewInit, OnDestroy {
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;

  pulsos: Pulso[] = [];
  equipo!: string;
  proceso!: string;
  fecha!: Date;
  velocidadIdeal!: number;
  private subs = new Subscription();

  constructor(
    private pulsoService: PulsoService,
    private fechaService: FechaService,
    private equipoService: EquipoService,
    private procesoService: ProcesoService,
    private maquinasService: MaquinasService
  ) {}

  ngAfterViewInit(): void {
    this.createChart();

    // Nos suscribimos a los valores globales solo después de que el canvas exista
    this.subs.add(
      combineLatest([
        this.equipoService.equipo$,
        this.procesoService.proceso$,
        this.fechaService.fecha$
      ]).subscribe(([equipo, proceso, fecha]) => {
        this.equipo = equipo;
        this.proceso = proceso;
        this.fecha = fecha;

        if (equipo && proceso && fecha) {
          // Primero obtener Velocidad Ideal
          this.maquinasService.getVelocidadIdeal(equipo, proceso).subscribe({
            next: (vel) => {
              this.velocidadIdeal = vel;
              this.cargarPulsos(); // cargar pulsos después de obtener la velocidad ideal
            },
            error: (err) => console.error('Error al obtener Velocidad Ideal', err)
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  cargarPulsos(): void {
    this.pulsoService.getPulsos(this.equipo, this.proceso, this.fecha).subscribe({
      next: (data: Pulso[]) => {
        this.pulsos = data;
        this.actualizarGrafico();
      },
      error: (err) => console.error('Error al obtener pulsos:', err)
    });
  }

  createChart(): void {
    const ctx = this.myChartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Pulsos',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          },
          {
            label: 'Velocidad Ideal',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            borderDash: [10, 10], // línea discontinua
            fill: true,
            pointRadius: 0 // sin puntos
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            color: '#53eafd',
            font: { size: 18, weight: 'bold' }
          },
          legend: { display: true, position: 'bottom' },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.6)', // color de las líneas horizontales
              lineWidth: 1                      // grosor
            },
            ticks: {
              color: '#007595',                // color de los números del eje Y
              maxTicksLimit: 20
            }
          },
          x: {
            title: { 
              display: true, 
              text: 'Hora',  
              color: '#53eafd',
              font: {
                size: 16,         // tamaño del texto del eje X
                weight: 'bold',   // negrita 
                family: 'Arial'   // fuente 
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.6)', // color de las líneas verticales
              lineWidth: 1                      // grosor
            },
            ticks: {
              color: '#007595',                 // color de los números del eje X
              maxTicksLimit: 13
            }
          }
        }
      }
    });
  }

  actualizarGrafico(): void {
    if (!this.chart) return;
  
    const labels = this.pulsos.map(p => new Date(p.tiempo).toLocaleTimeString());
    const pulsosData = this.pulsos.map(p => p.pulsos);
    const velocidadData = this.pulsos.map(() => this.velocidadIdeal); // mismo valor para todos
  
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = pulsosData;       // pulsos
    this.chart.data.datasets[1].data = velocidadData;    // velocidad ideal

    if (this.chart && this.equipo && this.proceso && this.fecha) {
      this.chart.options.plugins!.title!.text = 
        `Gráfico de Pulsos - Equipo: Proceso: ${this.proceso}`;
      this.chart.update();
    }
  
    this.chart.update();
  }
}
