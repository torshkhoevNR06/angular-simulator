import { Injectable } from '@angular/core';
import { MessageType } from '../enums/MessageType';
import { IMessage } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];

  private addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messages = [newMessage, ...this.messages];
    
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }
  
  showWarn(text: string): void {
    this.addMessage(MessageType.WARN, text);
  }
  
  showError(text: string): void {
    this.addMessage(MessageType.ERROR, text);
  }
  
  showSuccess(text: string): void {
    this.addMessage(MessageType.SUCCESS, text);
  }
  
  showInfo(text: string): void {
    this.addMessage(MessageType.INFO, text);
  }

  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((message: IMessage) => message !== messageToRemove);
  }
  
}