import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../../services/weather.service';
import { City } from '../../../models/city.model';
import { WeatherResult } from '../../../models/weather-result.model';
import { HeaderComponent } from '../../layout/header-component/header.component';
import { WeatherCardComponent } from '../weather-card-component/weather-card.component';
import { FooterComponent } from '../../layout/footer-component/footer.component';

@Component({
  selector: 'app-weather-list',
  imports: [FormsModule, HeaderComponent, WeatherCardComponent, FooterComponent],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherListComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  cities: City[] = [];
  weatherList: WeatherResult[] = [];
  loading = false;
  error?: string;
  searchCity = '';

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.loading = true;
    this.cdr.markForCheck();
    this.weatherService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
        this.cdr.markForCheck();
        this.loadAllWeather();
      },
      error: (err) => {
        this.error = 'Failed to load cities';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  loadAllWeather() {
    this.weatherList = [];
    this.cities.forEach((city) => {
      this.weatherService.getWeather(city.id).subscribe({
        next: (weather) => {
          this.weatherList.push(weather);
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(`Failed to load weather for ${city.name}`, err);
        },
      });
    });
  }

  onCardClick(cityId: number) {
    this.router.navigate(['/weather', cityId]);
  }

  onAddCity() {
    if (this.searchCity.trim()) {
      // Add city logic here
      console.log('Add city:', this.searchCity);
    }
  }
}
