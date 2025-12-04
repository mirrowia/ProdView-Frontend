import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicators',
  standalone: true,
  templateUrl: './indicators.html',
  styleUrls: ['./indicators.css'],
})
export class Indicators implements OnInit {
  refreshInterval = 8000; // 8 segundos

  images = [
    { id: 1, url: 'assets/images/prod1.jpeg' },
    { id: 2, url: 'assets/images/prod2.jpeg' },
    { id: 3, url: 'assets/images/prod3.jpeg' },
    { id: 4, url: 'assets/images/prod5.jpeg' },
  ];

  ngOnInit() {
    setInterval(() => {
      this.images = this.images.map(img => ({
        ...img,
        // Fuerzo que refresque agregando ?t=timestamp,
        // así el browser no usa caché.
        url: img.url.split('?')[0] + '?t=' + Date.now()
      }));
    }, this.refreshInterval);
  }
}
