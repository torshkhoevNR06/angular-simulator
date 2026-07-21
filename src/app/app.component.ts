import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { MessageComponent } from '../message/message.component';
import { MessageType } from '../enum/MessageType';
import { Color } from '../enum/Color';
import { APP_CONFIG } from '../app-config.token';
import { IAppConfig } from '../interface/IAppConfig';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, LoaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  APP_CONFIG: IAppConfig = inject(APP_CONFIG);
  messageType: typeof MessageType = MessageType;

  constructor() {
    this.isPrimaryColor(Color.RED);
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }
}
