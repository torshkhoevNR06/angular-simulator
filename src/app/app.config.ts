import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { Theme } from '../enums/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { PresetVariants } from '../types/PresetVariants';

const getSavedTheme = (): PresetVariants => {
  const savedTheme: string | Theme = localStorage.getItem('theme') ?? Theme.AURA;

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
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getSavedTheme(),
        options: { darkModeSelector: '.p-dark' },
      },
    }),
  ]
};