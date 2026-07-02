import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MessageService } from '../service/message.service';
import { Observable } from 'rxjs';
import { IMessage } from '../interface/IMessage';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  
  messages$: Observable<IMessage[]> = this.messageService.messages$;

}