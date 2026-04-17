import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';
import { MessageComponent } from '../message/message.component';
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