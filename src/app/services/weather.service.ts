import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { City } from '../models/city.model';
import { WeatherResult } from '../models/weather-result.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  getCities(): Observable<City[]> {
    const url = this.apiService.getEndpoint('getCities');
    return this.http.get<City[]>(url);
  }

  getWeather(cityId: number): Observable<WeatherResult> {
    const url = this.apiService.getEndpoint('getWeatherByCity', { cityId });
    return this.http.get<WeatherResult>(url);
  }
}
