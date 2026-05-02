import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { usePreset } from '@primeuix/styled'
import { Theme } from '../enums/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { PresetVariants } from '../types/PresetVariants';

const setTheme = (): PresetVariants => {
  const savePreset: string = JSON.parse(localStorage.getItem('theme')!);
    
  if (savePreset === Theme.NORA) {
    return usePreset(Nora);
  } else if (savePreset === Theme.LARA) {
    return usePreset(Lara);
  } else {
    return usePreset(Aura);
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