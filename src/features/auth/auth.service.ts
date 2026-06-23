import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { IAuth } from './IAuth';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ITokenResponse } from './ITokenResponse';

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
      this.tokenResponse = this.localStorageService.getItem('tokenResponse')!;
      this.accessToken = this.localStorageService.getItem('accessToken')!;
      this.refreshToken = this.localStorageService.getItem('refreshToken')!;
    }

    return !!this.accessToken;
  }

  saveTokens(tokenResponse: ITokenResponse): void {
    this.tokenResponse = tokenResponse;
    this.accessToken = tokenResponse.accessToken;
    this.refreshToken = tokenResponse.refreshToken;

    this.localStorageService.setItem('tokenResponse', tokenResponse);
    this.localStorageService.setItem('accessToken', tokenResponse.accessToken);
    this.localStorageService.setItem('refreshToken', tokenResponse.refreshToken);
  }

  logout(): void {
    this.localStorageService.removeItem('tokenResponse');
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.tokenResponse = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

}