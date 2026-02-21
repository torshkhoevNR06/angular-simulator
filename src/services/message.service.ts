import { Injectable } from '@angular/core';
import { MessageType } from '../enums/MessageType';
import { IMessage } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];

  addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messages = [newMessage, ...this.messages];
    
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((message: IMessage) => message !== messageToRemove);
  }
  
}