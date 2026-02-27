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
  
  showWarn(type: MessageType.WARN, text: string) {
    this.addMessage(type, text);
  }
  
  showError(type: MessageType.ERROR, text: string): void {
    this.addMessage(type, text);
  }
  
  showSuccess(type: MessageType.SUCCESS, text: string): void {
    this.addMessage(type, text);
  }
  
  showInfo(type: MessageType.INFO, text: string): void {
    this.addMessage(type, text);
  }

  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((message: IMessage) => message !== messageToRemove);
  }
  
}