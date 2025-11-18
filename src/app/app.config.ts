import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AppService } from './services/app.service';
import { ApiService } from './services/api.service';

import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';

function initializeApp(appService: AppService, apiService: ApiService) {
  return async () => {
    await appService.loadConfiguration();
    await apiService.loadConfiguration();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    provideAuth0({
      domain: 'dev-a46wxo22df4cuc5n.us.auth0.com',
      clientId: 'lGfM1wfdKFhzCMphJeZ93oDNtGtun1tb',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://fidenz-weather-api',
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://localhost:7290/api/*',
          },
        ],
      },
    }),

    provideHttpClient(withFetch(), withInterceptors([authHttpInterceptorFn])),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppService, ApiService],
      multi: true,
    },
  ],
};
