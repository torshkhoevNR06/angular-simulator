import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MessageComponent } from '../message/message.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [MessageComponent, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  
  messageService: MessageService = inject(MessageService);
  liveInputValue!: string;
  selectedLocation!: boolean;
  selectedDate!: boolean;
  selectedParticipants!: boolean;
  
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
      image: "mountain-lake",
      rating: "4.9",
      title: "Озеро возле гор",
      description: "романтическое приключение",
      price: 480
    },
    {
      id: 2,
      image: "night-mountains",
      rating: "4.5",
      title: "Ночь в горах",
      description: "в компании друзей",
      price: 500
    },
    {
      id: 3,
      image: "mountain-exercise",
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
  ]

   isFormValid(): boolean {
    return this.selectedLocation && this.selectedDate && this.selectedParticipants;
  }

}
