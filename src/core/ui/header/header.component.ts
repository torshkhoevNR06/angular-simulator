import { Component, inject, type Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isActive, Router, RouterModule } from '@angular/router';
import { AsyncPipe, DATE_PIPE_DEFAULT_OPTIONS, DatePipe, DatePipeConfig } from '@angular/common';
import { LocalStorageService } from '../../../shared/service/local-storage.service';
import { ThemeService } from '../../../shared/service/theme.service';
import { Theme } from '../../../shared/enum/Theme';
import { faMoon, faRightFromBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { ToggleSwitchModule, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import { Observable } from 'rxjs';
import { AuthService } from '../../../features/auth/service/auth.service';
import { INavigation } from './interface/INavigation';
import { IAppConfig } from '../../../shared/interface/IAppConfig';
import { TranslatePipe } from '@ngx-translate/core';
import { Language } from '../../../shared/ui/language/language.component';
import { MessageService } from '../message/service/message.service';
import { LanguageService } from '../../../shared/ui/language/service/language.service';
import { CartService } from '../../../features/products/service/cart.service';

@Component({
  selector: 'app-header',
  imports: [ FormsModule, DatePipe, RouterModule, FontAwesomeModule, ToggleSwitchModule, ButtonModule, SelectButtonModule, AsyncPipe, TranslatePipe, Language],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  languageService: LanguageService = inject(LanguageService);
  cartService: CartService = inject(CartService);
  
  router = inject(Router);

  productsRouteActive: Signal<boolean> = isActive('/products', this.router);

  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
  theme$: Observable<Theme> = this.themeService.theme$;

  APP_CONFIG: IAppConfig = this.themeService.APP_CONFIG;
  DATE_PIPE_DEFAULT_OPTIONS: DatePipeConfig = inject(DATE_PIPE_DEFAULT_OPTIONS);

  currentTask!: 'counter' | 'dateTime';
  companyName: string = 'Румтибет';
  dateTime!: Date;
  counter: number = 0;

  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  faRightFromBracket: IconDefinition = faRightFromBracket;

  pages: INavigation[] = [
    { key: 'header.pages.home', path: '' },
    { key: 'header.pages.users', path: 'users' },
    { key: 'header.pages.posts', path: 'posts' },
    { key: 'header.pages.products', path: 'products' }
  ];

  constructor() {
    this.saveVisitsCount();
    this.saveLastVisit();

    const saveCounter: number = this.localStorageService.getItem('counter')!;
    if (saveCounter) {
      this.counter = saveCounter;
    }

    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  setTheme(theme: SelectButtonChangeEvent): void {
    this.themeService.setTheme(theme.value);
  }

  incrementCounter(): void {
    this.counter++;
    localStorage.setItem('counter', JSON.stringify(this.counter));
  }

  decrementCounter(): void {
    this.counter--;
    localStorage.setItem('counter', JSON.stringify(this.counter));
  }

  setCurrentTask(task: 'counter' | 'dateTime'): void {
    this.currentTask = task;
  }

  onConsultation(): void {
    this.messageService.showSuccess(this.languageService.translateService.instant('header.consultationMessage'));
  }

  private saveLastVisit(): void {
    localStorage.setItem('userDate', JSON.stringify(new Date()));
  }

  private saveVisitsCount(): void {
    const visitsRaw: number = Number(localStorage.getItem('user-visit'));
    const visits: number = isNaN(visitsRaw) ? 1 : visitsRaw + 1;
    localStorage.setItem('user-visit', JSON.stringify(visits));
  }

}