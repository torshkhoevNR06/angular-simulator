import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';
import { MessageComponent } from '../message/message.component';
import { MessageType } from '../enums/MessageType';
import { Color } from '../enums/Color';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, HeaderComponent,  FooterComponent, LoaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  messageType: typeof MessageType = MessageType;
  private router: Router = inject(Router);
  private url!: string;
  
  showMenu: boolean = false;

  constructor() {
    this.isPrimaryColor(Color.RED);

    this.router.events.pipe(
      filter((event: unknown) => event instanceof NavigationEnd),
      tap(((url: NavigationEnd) => {
        this.url = url.url;
        if (this.url.indexOf('/login') === 0) {
          return this.showMenu = false;
        } else {
          return this.showMenu = true;
        }
      }))
    ).subscribe();
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }
  
}