import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../config/api-config';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private appService = inject(AppService);

  private apiConfig = signal<ApiConfig | null>(null);

  private configLoaded = signal(false);

  async loadConfiguration(): Promise<void> {
    if (this.configLoaded()) {
      return;
    }

    try {
      const apiConfig = await this.http
        .get<ApiConfig>('/configuration/api-configuration.json')
        .toPromise();

      this.apiConfig.set(apiConfig ?? null);
      this.configLoaded.set(true);
    } catch (error) {
      console.error('Failed to load API configuration', error);
      throw error;
    }
  }

  getEndpoint(endpointKey: keyof ApiConfig, params?: Record<string, string | number>): string {
    const config = this.apiConfig();
    if (!config) {
      throw new Error('API configuration not loaded');
    }

    let endpoint = config[endpointKey];

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        endpoint = endpoint.replace(`{${key}}`, String(value));
      });
    }

    return `${this.appService.getBaseUrl()}${endpoint}`;
  }
}
