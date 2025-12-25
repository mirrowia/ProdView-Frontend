import { Component } from '@angular/core';
import { DepositoService } from 'app/services/deposito-service';

@Component({
  selector: 'app-deposito',
  imports: [],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {

  constructor(private service: DepositoService) {}

  services = [
    {
      id: 'mysql',
      title: 'Reiniciar MariaDB',
      description: 'Reinicia el servicio de base de datos MariaDB.',
      icon: 'storage'
    },
    {
      id: 'zoneminder',
      title: 'Reiniciar Zoneminder',
      description: 'Reinicia el servicio de cámaras Zoneminder.',
      icon: 'videocam'
    }
  ];

  restart(serviceId: string) {
    this.service.restartService(serviceId)
      .subscribe({
        next: (resp) => console.log('Servicio reiniciado', resp),
        error: (err) => console.error('Error', err)
      });
  }
}
