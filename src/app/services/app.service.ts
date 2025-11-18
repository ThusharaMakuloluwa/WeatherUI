import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);
  private appConfig = signal<AppConfig | null>(null);
  private configLoaded = signal(false);

  async loadConfiguration(): Promise<void> {
    if (this.configLoaded()) {
      return;
    }

    try {
      const appConfig = await this.http
        .get<AppConfig>('/configuration/app-configuration.json')
        .toPromise();

      this.appConfig.set(appConfig ?? null);
      this.configLoaded.set(true);
    } catch (error) {
      console.error('Failed to load app configuration', error);
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
}
