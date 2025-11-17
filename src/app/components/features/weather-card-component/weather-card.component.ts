import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WeatherResult } from '../../../models/weather-result.model';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() weather!: WeatherResult;
  @Output() cardClick = new EventEmitter<number>();

  onClick() {
    this.cardClick.emit(this.weather.cityId);
  }
}
