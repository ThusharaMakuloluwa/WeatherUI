import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../../services/weather.service';
import { WeatherResult } from '../../../models/weather-result.model';
import { HeaderComponent } from '../../layout/header-component/header.component';
import { FooterComponent } from '../../layout/footer-component/footer.component';

@Component({
  selector: 'app-weather-detail',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.scss',
})
export class WeatherDetailComponent implements OnInit {
  weather?: WeatherResult;
  loading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    const cityId = this.route.snapshot.params['id'];
    if (cityId) {
      this.loadWeather(+cityId);
    }
  }

  loadWeather(cityId: number) {
    this.loading = true;
    this.weatherService.getWeather(cityId).subscribe({
      next: (data) => {
        this.weather = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load weather details';
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
