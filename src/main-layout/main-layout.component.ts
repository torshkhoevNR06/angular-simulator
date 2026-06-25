import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../features/auth/auth.service';
import { AuthApiService } from '../features/auth/auth-api.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

  authService: AuthService = inject(AuthService);
  authApi = inject(AuthApiService)
  
}
