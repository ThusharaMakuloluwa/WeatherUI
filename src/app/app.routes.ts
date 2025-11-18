import { Routes } from '@angular/router';
import { WeatherDetailComponent } from './components/features/weather-detail-component/weather-detail.component';
import { WeatherListComponent } from './components/features/weather-list-component/weather-list.component';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: WeatherListComponent, canActivate: [authGuardFn] },
  { path: 'weather/:id', component: WeatherDetailComponent, canActivate: [authGuardFn] },
  { path: '**', redirectTo: '' },
];
