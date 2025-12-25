import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepositoService } from 'app/services/deposito-service';
import { Deposito } from "../deposito/deposito";

@Component({
  selector: 'app-indicator',
  imports: [Deposito],
  templateUrl: './indicator.html',
  styleUrl: './indicator.css',
})
export class Indicator {
  indicatorId: string | null = null;

  private ipMap: Record<string, string> = {
    '1': '192.168.1.201',
    '2': '192.168.1.202',
    '3': '192.168.1.203',
    '4': '192.168.1.205',
  };

  constructor(private route: ActivatedRoute, private service: DepositoService) {}

  ngOnInit() {
    this.indicatorId = this.route.snapshot.paramMap.get('id');
  }

  get currentIp(): string | null {
    return this.indicatorId ? this.ipMap[this.indicatorId] : null;
  }

  go(action: string) {
    if (!this.currentIp) {
      console.error('No se pudo determinar la IP para este indicador.');
      return;
    }

    if (action === 'restart-gdm') {
      this.service.restartGdm(this.currentIp).subscribe({
        next: (resp) => console.log('OK', resp),
        error: (err) => console.error('ERROR', err)
      });
    }

    if (action === 'restart-os') {
      this.service.restartOs(this.currentIp).subscribe({
        next: (resp) => console.log('OK', resp),
        error: (err) => console.error('ERROR', err)
      });
    }
  }
}
