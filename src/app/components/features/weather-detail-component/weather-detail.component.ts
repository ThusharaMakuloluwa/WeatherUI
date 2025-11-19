import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { WeatherService } from '../../../services/weather.service';
import { WeatherResult } from '../../../models/weather-result.model';
import { HeaderComponent } from '../../layout/header-component/header.component';
import { FooterComponent } from '../../layout/footer-component/footer.component';

@Component({
  selector: 'app-weather-detail',
  imports: [HeaderComponent, FooterComponent, NgClass],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private weatherService = inject(WeatherService);
  private cdr = inject(ChangeDetectorRef);

  weather?: WeatherResult;
  loading = false;
  error?: string;

  ngOnInit(): void {
    console.log('WeatherDetailComponent initialized');
    const cityId = this.route.snapshot.params['id'];
    console.log('City ID from route:', cityId);
    if (cityId) {
      this.loadWeather(+cityId);
    }
  }

  loadWeather(cityId: number) {
    this.loading = true;
    this.cdr.markForCheck();
    console.log('Loading weather for city:', cityId, 'loading state:', this.loading);
    this.weatherService.getWeather(cityId).subscribe({
      next: (data) => {
        console.log('Weather data received:', data);
        this.weather = data;
        this.loading = false;
        this.cdr.markForCheck();
        console.log('Loading state after data:', this.loading, 'weather:', this.weather);
      },
      error: (err) => {
        console.error('Failed to load weather:', err);
        this.error = 'Failed to load weather details';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getWeatherIcon(): string {
    if (!this.weather) return 'bi-cloud';

    const description = this.weather.description.toLowerCase();

    if (description.includes('cloud')) {
      return 'bi-cloud';
    } else if (description.includes('rain')) {
      return 'bi-cloud-rain';
    } else if (description.includes('clear')) {
      return 'bi-sun';
    } else if (description.includes('snow')) {
      return 'bi-snow';
    } else if (description.includes('thunder') || description.includes('storm')) {
      return 'bi-cloud-lightning';
    } else if (description.includes('fog') || description.includes('mist')) {
      return 'bi-cloud-fog';
    } else {
      return 'bi-cloud-sun';
    }
  }
}
