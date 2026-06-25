import { Component, inject } from '@angular/core';
import { AuthApiService } from '../features/auth/auth-api.service';

@Component({
  selector: 'app-not-found-page',
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {

  private authApiService: AuthApiService = inject(AuthApiService);

  ngOnInit(): void {
    this.authApiService.getAuthUser().subscribe();
  }

}