import { inject, Injectable } from '@angular/core';
import { usePreset } from '@primeuix/themes';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ITheme } from '../interface/ITheme';
import { Theme } from '../enum/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { APP_CONFIG } from '../app-config.token';
import { IAppConfig } from '../interface/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  APP_CONFIG: IAppConfig = inject(APP_CONFIG);

  private isDarkModeSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.initDarkMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
      return isDarkMode
        ? element.classList.add('p-dark')
        : element.classList.remove('p-dark');
    }),
  );

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    this.initTheme(),
  );
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  themes: ITheme[] = [
    { name: 'Nora', value: Theme.NORA, preset: Nora },
    { name: 'Aura', value: Theme.AURA, preset: Aura },
    { name: 'Lara', value: Theme.LARA, preset: Lara },
  ];

  private initDarkMode(): boolean {
    if (this.APP_CONFIG.enableTheming) {
      return this.localStorageService.getItem('isDarkMode') ?? false;
    }

    return !this.APP_CONFIG.enableTheming;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setItem('isDarkMode', isDarkMode);
  }

  private initTheme(): Theme {
    if (this.APP_CONFIG.enableTheming) {
      return this.localStorageService.getItem('theme') ?? Theme.AURA;
    }

    return Theme.AURA;
  }

  setTheme(theme: Theme): void {
    const getRelevantTheme: ITheme = this.themes.find(
      (topic: ITheme) => topic.value === theme,
    )!;

    this.themeSubject.next(theme);
    usePreset(getRelevantTheme.preset);
    this.localStorageService.setItem('theme', theme);
  }
}
