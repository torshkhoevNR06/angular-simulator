import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptor/logging.interceptor';
import { errorInterceptor } from '../interceptor/error.interceptor';
import { PresetVariants } from '../type/PresetVariants';
import { Theme } from '../enum/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { authInterceptor } from '../features/auth/interceptor/auth.interceptor';
import { AuthService } from '../features/auth/service/auth.service';
import { firstValueFrom } from 'rxjs';

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
    }),
    provideAppInitializer(() => firstValueFrom(inject(AuthService).restoreAuthState()))
  ]
};