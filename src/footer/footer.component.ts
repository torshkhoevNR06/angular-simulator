import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faVk, faPinterest, faSkype  } from '@fortawesome/free-brands-svg-icons';
import { ISocialNetwork } from '../interfaces/ISocialNetwork';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  messageService: MessageService = inject(MessageService);

  faAngleRight: IconDefinition = faAngleRight;
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

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
    { id: 1, image: faTelegram },
    { id: 2, image: faVk },
    { id: 3, image: faPinterest },
    { id: 4, image: faSkype },
  ]

}