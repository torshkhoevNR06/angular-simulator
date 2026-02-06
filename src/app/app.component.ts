import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color } from '../enums/Color';
import './training';
import './collection';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'Румтибет';
  selectedLocation: string = '';
  selectedDate: string = '';
  selectedParticipants: string = '';
  selectedInput!: string;
  dateTime!: string;
  counter: number = 0;
  currentTask!: 'counter' | 'dateTime';
  isLoading: boolean = true;
  
  locations: ILocation[] = [
    { id: 1, name: 'Исландия' },
    { id: 2, name: 'Новосибирск' },
    { id: 3, name: 'Коста-Рика' }
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

  cards: IAdvantage[] = [
    {
      id: 1,
      iconName: "tourists-icon",
      title: "Опытный гид",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 2,
      iconName: "security-icon",
      title: "Безопасный поход",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 3,
      iconName: "price-tag-icon",
      title: "Лояльные цены",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    }
  ];

  constructor() {
    this.saveLastVisit();
    this.saveVisitsСount();
    this.getPrimaryColor(Color.RED);
    
    const saveCounter: number = Number(localStorage.getItem('counter'));
    if (saveCounter) {
      this.counter = saveCounter;
    }

    setInterval(() => {
      this.dateTime = new Date().toLocaleString();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private getPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    const date: string = new Date().toString();
    localStorage.setItem("userDate", JSON.stringify(date));
  }

  private saveVisitsСount(): void {
    const visitsRaw: number = Number(localStorage.getItem("user-visit"));
    const visits: number = isNaN(visitsRaw) ? 1 : visitsRaw + 1;
    localStorage.setItem("user-visit", JSON.stringify(visits));
  }

  isValidInput(): string {
    return this.selectedLocation && this.selectedDate && this.selectedParticipants;
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

}