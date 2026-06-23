import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MessageService } from '../services/message.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../enums/Theme';
import { faMoon, faRightFromBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { ToggleSwitchModule, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import { Observable } from 'rxjs';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule, FontAwesomeModule, ToggleSwitchModule, ButtonModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);
  themeService: ThemeService = inject(ThemeService);
  authService = inject(AuthService);
  
  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
  theme$: Observable<Theme> = this.themeService.theme$;

  currentTask!: 'counter' | 'dateTime';
  companyName: string = 'Румтибет';
  dateTime!: string;
  counter: number = 0;
  
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  faRightFromBracket: IconDefinition = faRightFromBracket;

  pages: INavigation[] = [
    { page: "Главная", path: "" },
    { page: "Пользователи", path: "users" },
    { page: "Посты", path: "posts" }
  ];

  constructor() {
    this.saveVisitsCount();
    this.saveLastVisit();
    
    const saveCounter: number = this.localStorageService.getItem('counter')!;
    if (saveCounter) {
      this.counter = saveCounter;
    }

    setInterval(() => {
      this.dateTime = new Date().toLocaleString();
    }, 1000);
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked)
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

  private saveLastVisit(): void {
    const date: string = new Date().toString();
    localStorage.setItem("userDate", JSON.stringify(date));
  }

  private saveVisitsCount(): void {
    const visitsRaw: number = Number(localStorage.getItem("user-visit"));
    const visits: number = isNaN(visitsRaw) ? 1 : visitsRaw + 1;
    localStorage.setItem("user-visit", JSON.stringify(visits));
  }

}