import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { IAuth } from './IAuth';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import type { ITokenResponse } from './ITokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  tokenResponse!: ITokenResponse | null;
  accessToken!: string | null;
  refreshToken!: string | null;
  
  authorizeUser(userForm: IAuth): Observable<IAuth> {
    return this.authApiService.getUser(userForm).pipe(
      tap((tokenResponse: IAuth) => this.saveTokens(tokenResponse))
    )
  }

  authRefreshToken(): Observable<ITokenResponse> {
    return this.authApiService.getRefreshToken(this.tokenResponse!).pipe(
      tap((tokenResponse: ITokenResponse) => this.saveTokens(tokenResponse))
    )
  }

  isAuth(): boolean {
    if (!this.accessToken) {
      this.tokenResponse = this.localStorageService.getItem('userApiData')!;
      this.accessToken = this.localStorageService.getItem('accessToken')!;
      this.refreshToken = this.localStorageService.getItem('refreshToken')!;
    }

    return !!this.accessToken;
  }

  saveTokens(userApiData: ITokenResponse): void {
    this.tokenResponse = userApiData;
    this.accessToken = userApiData.accessToken;
    this.refreshToken = userApiData.refreshToken;

    this.localStorageService.setItem('userApiData', userApiData);
    this.localStorageService.setItem('accessToken', userApiData.accessToken);
    this.localStorageService.setItem('refreshToken', userApiData.refreshToken);
  }

  logout(): void {
    this.localStorageService.removeItem('userApiData');
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.tokenResponse = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

}