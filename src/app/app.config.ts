import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PresetVariants } from '../core/type/PresetVariants';
import { Theme } from '../shared/enum/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { AuthService } from '../features/auth/service/auth.service';
import { firstValueFrom } from 'rxjs';
import { IAppConfig } from '../shared/interface/IAppConfig';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { errorInterceptor } from '../core/interceptor/error.interceptor';
import { loggingInterceptor } from '../core/interceptor/logging.interceptor';
import { authInterceptor } from '../core/interceptor/auth.interceptor';
import { APP_CONFIG } from '../core/token/app-config.token';
import { provideStore } from '@ngrx/store';
import { recipesReducer } from '../features/recipes/state/recipes.reducers';
import { provideEffects } from '@ngrx/effects';
import { RecipesEffectsService } from '../features/recipes/state/recipes.effects';

const getSavedTheme = (appConfigValue: IAppConfig): PresetVariants => {
  let savedTheme: Theme = (localStorage.getItem('theme') as Theme) ?? Theme.AURA;
  const element: HTMLHtmlElement = document.querySelector('html')!;

  if (!appConfigValue.enableTheming) {
    element.classList.add('p-dark');
    savedTheme = Theme.AURA;
  }

  switch (savedTheme) {
  case Theme.NORA:
    return Nora;

  case Theme.LARA:
    return Lara;

  default:
    return Aura;
  }
};

const appConfigValue: IAppConfig = {
  companyName: 'header.companyName',
  enableLogs: false,
  enableNotifications: true,
  enableTheming: true,
  sessionTimeout: 40
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() =>
      firstValueFrom(inject(AuthService).restoreAuthState())
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])
    ),
    provideZoneChangeDetection(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'ru',
      lang: `${ localStorage.getItem('language') || 'ru' }`
    }),
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
    }),
    provideStore({
      recipes: recipesReducer
    }),
    provideEffects([RecipesEffectsService])
  ]
};