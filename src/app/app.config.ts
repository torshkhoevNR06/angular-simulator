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
import { DATE_PIPE_DEFAULT_OPTIONS } from '../format-date.token';
import { IAppConfig } from '../interface/IAppConfig';
import { APP_CONFIG } from '../app-setup.token';

const getSavedTheme = (appConfigValue: IAppConfig): PresetVariants => {
  let savedTheme: Theme;

  if (!appConfigValue.enableTheming) {
    localStorage.setItem('theme', Theme.AURA);
    savedTheme = localStorage.getItem('theme') as Theme ?? Theme.AURA;
  } else {
    savedTheme = localStorage.getItem('theme') as Theme ?? Theme.AURA;
  }

  switch(savedTheme) {
  case Theme.NORA:
    return Nora;
    
  case Theme.LARA:
    return Lara;
    
  default:
    return Aura;
  }
};

const appConfigValue: IAppConfig = {
  companyName: 'IT-Simulator | Румтибет',
  enableLogs: false,
  enableNotifications: false,
  enableTheming: false,
  sessionTimeout: 40
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => firstValueFrom(inject(AuthService).restoreAuthState())),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])),
    provideZoneChangeDetection(),
    {
      provide: APP_CONFIG,
      useValue: appConfigValue
    },
    { 
      provide: DATE_PIPE_DEFAULT_OPTIONS, 
      useValue: { dateFormat: 'shortDate' } 
    },
    providePrimeNG({
      theme: {
        preset: getSavedTheme(appConfigValue),
        options: { darkModeSelector: '.p-dark' }
      }
    })
  ]
};