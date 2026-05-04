import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { Theme } from '../enums/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { PresetVariants } from '../types/PresetVariants';

const setTheme = (): PresetVariants => {
  const getTheme: string = JSON.parse(localStorage.getItem('theme') ?? 'Aura');
    
  switch(getTheme) {
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
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: setTheme(),
        options: { darkModeSelector: '.p-dark' },
      },
    }),
  ]
};