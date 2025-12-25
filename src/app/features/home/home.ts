import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
services: Service[] = [
    {
    name: 'Indicadores',
    description: 'Indicadores de produccion',
    url: '/indicadores',
    icon: 'monitor'
    },
    {
      name: 'ProdView',
      description: 'Panel de producción y estadísticas.',
      url: '/prod-view/estadisticas',
      icon: 'analytics',
    },
    {
      name: 'ZoneMinder',
      description: 'Sistema de videovigilancia y monitoreo.',
      url: '/zm',
      icon: 'videocam',
    },
    {
      name: 'APCUPSD',
      description: 'Estado del UPS y energía.',
      url: '/cgi-bin/apcupsd/multimon.cgi',
      icon: 'battery_full',
    },
    {
      name: 'Grafana',
      description: 'Monitoreo y estadisticas de equipos.',
      url: 'http://192.168.0.6:3000/d/ad9pvfj/prometheus',
      icon: 'grafana',
    }
  ];

  goTo(url: string) {
    window.location.href = url;
  }
}
