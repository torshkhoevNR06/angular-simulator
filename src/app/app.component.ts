import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { MessageService } from '../services/message.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Color } from '../enums/Color';
import { MessageType } from '../enums/MessageType';
import './training';
import './collection';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'Румтибет';
  selectedLocation!: boolean;
  selectedDate!: boolean;
  selectedParticipants!: boolean;
  liveInputValue!: string;
  dateTime!: string;
  counter: number = 0;
  currentTask!: 'counter' | 'dateTime';
  isLoading: boolean = true;
  messageType: typeof MessageType = MessageType;
  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

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

  directions: IDirection[] = [
    {
      id: 1,
      rating: "4.9",
      title: "Озеро возле гор",
      description: "романтическое приключение",
      price: 480
    },
    {
      id: 2,
      rating: "4.5",
      title: "Ночь в горах",
      description: "в компании друзей",
      price: 500
    },
    {
      id: 3,
      rating: "5.0",
      title: "Упр в горах",
      description: "для тех, кто забоится о себе",
      price: 230
    }
  ];

  articles: IArticle[] = [
    {
      id: 1,
      image: "manarola-sunset",
      title: "Красивая Италия, какая она в реальности?",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.",
      data: "01/11/2023"
    },
    {
      id: 2,
      image: "flight-dawn",
      title: "Долой сомнения! Весь мир открыт для вас!",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих условий активизации ...Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих условий активизации ...",
      data: "12/12/2023"
    },
    {
      id: 3,
      image: "road-trip",
      title: "Как подготовиться к путешествию в одиночку?",
      description: "Для современного мира базовый вектор развития предполагает.",
      data: "08/03/2024"
    },
    {
      id: 4,
      image: "taj-mahal",
      title: "Индия ... летим?",
      description: "Для современного мира базовый.",
      data: "25/06/2024"
    }
  ]
  
  constructor() {
    this.saveLastVisit();
    this.saveVisitsCount();
    this.isPrimaryColor(Color.RED);

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

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
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
  
  isFormValid(): boolean {
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