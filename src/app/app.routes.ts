import { Routes } from '@angular/router';
import { Estadisticas } from './features/prod-view/estadisticas/estadisticas';
import { Procesos } from './features/prod-view/procesos/procesos';
import { Home } from './features/home/home';
import { Indicators } from './features/indicators/indicators';
import { Indicator } from './features/indicators/indicator/indicator';
import { ProdSettings } from './features/prod-view/prod-settings/prod-settings';

export const routes: Routes = [
      // Redirige la ruta raíz a /estadisticas
//    { path: '', redirectTo: 'estadisticas', pathMatch: 'full' },
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'indicadores', component: Indicators,},
    { path: 'indicadores/:id', component: Indicator },
    { path: 'prod-view/estadisticas', component: Estadisticas },
    { path: 'prod-view/procesos', component: Procesos },
    { path: 'prod-view/configuraciones', component: ProdSettings },
];
