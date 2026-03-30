import { Injectable } from '@angular/core';
import { MessageType } from '../enums/MessageType';
import { IMessage } from '../interfaces/IMessage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();
  
  private addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    const messageList: IMessage[] = this.messagesSubject.getValue();
    this.messagesSubject.next([newMessage, ...messageList]);
    
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
    const messages: IMessage[] = this.messagesSubject.getValue()
    .filter((message: IMessage) => message !== messageToRemove);
    this.messagesSubject.next(messages);
  }
  
}