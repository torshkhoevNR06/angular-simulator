import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../services/message.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageType } from '../enums/MessageType';
import { Color } from '../enums/Color';
import './collection';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, HeaderComponent,  FooterComponent, LoaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);
  messageType: typeof MessageType = MessageType;
  isLoading: boolean = true;

  constructor() {
    this.isPrimaryColor(Color.RED);
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }
  
}