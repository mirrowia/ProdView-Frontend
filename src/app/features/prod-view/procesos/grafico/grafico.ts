import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Pulso } from 'app/models/pulso';
import { EquipoService } from 'app/services/global/equipo';
import { FechaService } from 'app/services/global/fecha';
import { ProcesoService } from 'app/services/global/proceso';
import { PulsoService } from 'app/services/pulso';
import { combineLatest, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MaquinasService } from 'app/services/maquinas';
import { Maquina } from 'app/models/maquina';
import { Servidor } from 'app/models/servidor';
import { DarkModeService } from 'app/services/dark-mode-service';
import jsPDF from 'jspdf';

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
  equipo!: Servidor;
  proceso!: Maquina;
  fecha!: Date;
  velocidadIdeal!: number;
  private subs = new Subscription();

  private getLightColors() {
    return {
      pulsosBg: 'rgba(75, 192, 192, 0.3)',
      pulsosBorder: 'rgba(75, 192, 192, 1)',
      velocidadBorder: 'rgba(255, 99, 132, 1)',
      velocidadFill: false,
      grid: 'rgba(50, 50, 50, 0.2)',
      ticks: '#003b51',
      title: '#005d6e',
      xTitle: '#005d6e',
      xTicks: '#005d6e'
    };
  }

  private getDarkColors() {
    return {
      pulsosBg: 'rgba(75, 192, 192, 0.3)',
      pulsosBorder: 'rgba(75, 192, 192, 0.8)',
      velocidadBorder: 'rgba(255, 99, 132, 1)',
      velocidadFill: true,
      grid: 'rgba(200, 200, 200, 0.6)',
      ticks: '#007595',
      title: '#53eafd',
      xTitle: '#53eafd',
      xTicks: '#53eafd'
    };
  }

  constructor(
    private pulsoService: PulsoService,
    private fechaService: FechaService,
    private equipoService: EquipoService,
    private procesoService: ProcesoService,
    private maquinasService: MaquinasService,
    private darkModeService: DarkModeService
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
          if(equipo.codigo != "" && proceso.codMaq != ""){
            // Primero obtener Velocidad Ideal            
            
            this.maquinasService.getVelocidadIdeal(equipo.codigo, proceso.codMaq).subscribe({
              next: (vel) => {
                this.velocidadIdeal = vel;
                this.cargarPulsos(); // cargar pulsos después de obtener la velocidad ideal
              },
              error: (err) => console.error('Error al obtener Velocidad Ideal', err)
            });
          }
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
    this.pulsoService.getPulsos(this.equipo.codigo, this.proceso.codMaq, this.fecha).subscribe({
      next: (data: Pulso[]) => {
        this.pulsos = data;
        this.actualizarGrafico();
      },
      error: (err) => console.error('Error al obtener pulsos:', err)
    });
  }

  createChart(): void {
    const ctx = this.myChartCanvas.nativeElement.getContext('2d');
    
    const isDark = this.darkModeService.darkMode();
    const theme = isDark ? this.getDarkColors() : this.getLightColors();

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Pulsos',
            data: [],
            backgroundColor: theme.pulsosBg,
            borderColor: theme.pulsosBorder,
            borderWidth: 2,
            fill: false,
            tension: 0.4
          },
          {
            label: 'Velocidad Ideal',
            data: [],
            borderColor: theme.velocidadBorder,
            borderWidth: 3,
            borderDash: [10, 10], // línea discontinua
            fill: theme.velocidadFill,
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
            color: theme.title,
            font: { size: 18, weight: 'bold' }
          },
          legend: { display: true, position: 'bottom' },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: theme.grid, // color de las líneas horizontales
              lineWidth: 1                      // grosor
            },
            ticks: {
              color: theme.ticks,                // color de los números del eje Y
              maxTicksLimit: 20
            }
          },
          x: {
            title: { 
              display: true, 
              text: 'Hora',  
              color: theme.xTitle,
              font: {
                size: 16,         // tamaño del texto del eje X
                weight: 'bold',   // negrita 
                family: 'Arial'   // fuente 
              }
            },
            grid: {
              color: theme.grid, // color de las líneas verticales
              lineWidth: 1                      // grosor
            },
            ticks: {
              color: theme.xTicks,                 // color de los números del eje X
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
        `Gráfico de Pulsos - Equipo: Proceso: ${this.proceso.descripcion}`;
      this.chart.update();
    }
    this.chart.update();
  }
  
  downloadPDF() {
    const canvas = this.myChartCanvas.nativeElement;

    // Convertimos el canvas en imagen PNG
    const imgData = canvas.toDataURL('image/png');

    // Creamos el documento PDF (orientación portrait o landscape A4)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculamos proporciones para que entre bien
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save(`grafico_${new Date().toISOString().slice(0,10)}.pdf`);
  }
}
