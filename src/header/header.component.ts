import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageType } from '../enums/MessageType';
import { MessageService } from '../services/message.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule, MessageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  messageService: MessageService = inject(MessageService);
  messageType: typeof MessageType = MessageType;
  currentTask!: 'counter' | 'dateTime';
  companyName: string = 'Румтибет';
  liveInputValue!: string;
  dateTime!: string;
  counter: number = 0;
  selectedLocation!: boolean;
  selectedDate!: boolean;
  selectedParticipants!: boolean;

  pages: IPage[] = [
    { id: 1, page: "Главная" },
    { id: 2, page: "Пользователи" },
  ];

  locations: ILocation[] = [
    { id: 1, name: "Исландия" },
    { id: 2, name: "Новосибирск" },
    { id: 3, name: "Коста-Рика" }
  ];

  participants: IParticipant[] = [
    { id: 1, name: "Александр" },
    { id: 2, name: "Мария" },
    { id: 3, name: "Дмитрий" },
    { id: 4, name: "Анна" },
    { id: 5, name: "Иван" },
    { id: 6, name: "Екатерина" },
    { id: 7, name: "Сергей" },
    { id: 8, name: "Ольга" },
    { id: 9, name: "Андрей" },
    { id: 10, name: "Наталья" }
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

  isFormValid(): boolean {
    return this.selectedLocation && this.selectedDate && this.selectedParticipants;
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