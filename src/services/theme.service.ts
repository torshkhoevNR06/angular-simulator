import { inject, Injectable } from '@angular/core';
import { usePreset } from '@primeuix/themes';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ITheme } from '../interfaces/ITheme';
import { matchPresetTheme, PresetVariants } from '../types/PresetVariants';
import { Theme } from '../enums/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initDarkMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
      isDarkMode ? element.classList.add('p-dark') : element.classList.remove('p-dark');
    })
  );
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.initTheme());
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  themes: ITheme[] = [
    { name: 'Nora', value: Theme.NORA },
    { name: 'Aura', value: Theme.AURA },
    { name: 'Lara', value: Theme.LARA }
  ];
  
  private presets: matchPresetTheme = {
    [Theme.AURA]: Aura,
    [Theme.NORA]: Nora,
    [Theme.LARA]: Lara
  };
  
  constructor() {
    const preset: PresetVariants = this.presets[this.themeSubject.value];
    
    if (this.themeSubject.value === Theme.NORA) {
      usePreset(preset);
    } else if (this.themeSubject.value === Theme.AURA) {
      usePreset(preset);
    } else {
      usePreset(preset);
    }
  }
  
  private initDarkMode(): boolean {
    return this.localStorageService.getItem('isDarkMode') ?? false;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setItem('isDarkMode', isDarkMode);
  }
  
  private initTheme(): Theme {
    return this.localStorageService.getItem('theme') ?? Theme.AURA;
  }

  setTheme(theme: Theme): void {
    if (theme === null) {
      this.themeSubject.next(this.initTheme());
      usePreset(Aura);
      return;
    }

    this.themeSubject.next(theme);
    usePreset(this.presets[theme]);
    this.localStorageService.setItem('theme', theme);
  }
  
}