import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../config/api-config';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private appConfig = signal<AppConfig | null>(null);
  private apiConfig = signal<ApiConfig | null>(null);

  private configLoaded = signal(false);

  async loadConfiguration(): Promise<void> {
    if (this.configLoaded()) {
      return;
    }

    try {
      const [appConfig, apiConfig] = await Promise.all([
        this.http.get<AppConfig>('/configuration/app-configuration.json').toPromise(),
        this.http.get<ApiConfig>('/configuration/api-configuration.json').toPromise(),
      ]);

      this.appConfig.set(appConfig ?? null);
      this.apiConfig.set(apiConfig ?? null);
      this.configLoaded.set(true);
    } catch (error) {
      console.error('Failed to load configuration', error);
      throw error;
    }
  }

  getBaseUrl(): string {
    const config = this.appConfig();
    if (!config) {
      throw new Error('App configuration not loaded');
    }
    return config.apiBaseUrl;
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

    return `${this.getBaseUrl()}${endpoint}`;
  }
}
