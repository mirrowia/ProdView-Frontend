import { Routes } from '@angular/router';
import { EstadisticasTurno } from './components/estadisticas-turno/estadisticas-turno';
import { ProcesosActivos } from './components/procesos-activos/procesos-activos';

export const routes: Routes = [
      // Redirige la ruta raíz a /estadisticas
    { path: '', redirectTo: 'estadisticas', pathMatch: 'full' },
    { path: 'estadisticas', component: EstadisticasTurno }, // Ruta raíz
    { path: 'procesos', component: ProcesosActivos },
];
