import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
  inject,
} from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { routes } from './app.routes';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // habilita <mat-icon>
    importProvidersFrom(MatIconModule),

    // ✅ inicializador moderno (reemplaza APP_INITIALIZER)
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      iconRegistry.addSvgIcon(
        'grafana',
        sanitizer.bypassSecurityTrustResourceUrl(
          'assets/icons/grafana.svg'
        )
      );
    }),
  ],
};
