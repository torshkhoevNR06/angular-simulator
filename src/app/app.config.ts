import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptors/logging.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { PresetVariants } from '../types/PresetVariants';
import { Theme } from '../enums/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { authInterceptor } from '../features/auth/auth.interceptor';

const getSavedTheme = (): PresetVariants => {
  const savedTheme: Theme = localStorage.getItem('theme') as Theme ?? Theme.AURA;

  switch(savedTheme) {
    case Theme.NORA:
      return Nora;
    
    case Theme.LARA:
      return Lara;
    
    default:
      return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getSavedTheme(),
        options: { darkModeSelector: '.p-dark' },
      },
    })
  ]
};