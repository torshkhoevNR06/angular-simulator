import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  messageService: MessageService = inject(MessageService);
  currentTask!: 'counter' | 'dateTime';
  companyName: string = 'Румтибет';
  dateTime!: string;
  counter: number = 0;

  pages: INavigation[] = [
    { id: 1, page: "Главная", path: "" },
    { id: 2, page: "Пользователи", path: "users" },
  ];

  constructor() {
    this.saveVisitsCount();
    this.saveLastVisit();
    
    const saveCounter: number = Number(localStorage.getItem('counter'));
    if (saveCounter) {
      this.counter = saveCounter;
    }

    setInterval(() => {
      this.dateTime = new Date().toLocaleString();
    }, 1000);
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