import { Routes } from '@angular/router';
import { WeatherDetailComponent } from './components/features/weather-detail-component/weather-detail.component';
import { WeatherListComponent } from './components/features/weather-list-component/weather-list.component';

export const routes: Routes = [
  { path: '', component: WeatherListComponent },
  { path: 'weather/:id', component: WeatherDetailComponent },
  { path: '**', redirectTo: '' },
];
