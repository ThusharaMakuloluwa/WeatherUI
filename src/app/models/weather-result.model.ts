export interface WeatherResult {
  cityId: number;
  cityName: string;
  country: string;
  dateTime: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  description: string;
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: number;
  windDegree: number;
  sunrise: string;
  sunset: string;
}
