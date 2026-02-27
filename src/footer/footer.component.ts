import { Component, inject } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../services/message.service';
import { MessageType } from '../enums/MessageType';

@Component({
  selector: 'app-footer',
  imports: [MessageComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  messageService: MessageService = inject(MessageService);
  messageType: typeof MessageType = MessageType;

  favors: IFavor[] = [
    { id: 1, favor: "Прогулки в горы летом" },
    { id: 2, favor: "Зимние походы в горы" },
    { id: 3, favor: "Посещение храмов в горах" },
    { id: 4, favor: "Экстремальные виды туризма" },
    { id: 5, favor: "Походы в джунглях Амазонии" },
    { id: 6, favor: "Поездка в Африку" }
  ];
  
  travels: ITravel[] = [
    { id: 1, article: "Как собрать в долгий поход?" },
    { id: 2, article: "Жизненно важные предметы для похода" },
    { id: 3, article: "Медицинская страховка, гарантии безопасности" },
    { id: 4, article: "Если вы врач - загляните сюда" },
  ];

  socialNetworks: ISocialNetwork[] = [
    { id: 1, image: "telegram-icon" },
    { id: 2, image: "vk-icon" },
    { id: 3, image: "pinterest-icon" },
    { id: 4, image: "skype-icon" },
  ]

}