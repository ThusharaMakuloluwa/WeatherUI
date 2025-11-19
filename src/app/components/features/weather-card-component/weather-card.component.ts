import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { WeatherResult } from '../../../models/weather-result.model';

@Component({
  selector: 'app-weather-card',
  imports: [NgClass],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() weather!: WeatherResult;
  @Input() cardIndex: number = 0;
  @Output() cardClick = new EventEmitter<number>();

  onClick() {
    this.cardClick.emit(this.weather.cityId);
  }

  getCardColorClass(): string {
    const colorIndex = this.cardIndex % 5;
    return `card-color-${colorIndex + 1}`;
  }

  getWeatherIcon(): string {
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
