import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { IAuth } from './IAuth';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  apiUserData!: IAuth | null;
  accessToken!: string | null;
  refreshToken!: string | null;
  
  authorizeUser(userForm: IAuth): Observable<IAuth> {
    return this.authApiService.getUser(userForm).pipe(
      tap((userApiData: IAuth) => this.saveTokens(userApiData))
    )
  }

  authRefreshToken(): Observable<IAuth> {
    return this.authApiService.getRefreshToken(this.apiUserData!).pipe(
      tap((tokensResponse: IAuth) => this.saveTokens(tokensResponse))
    )
  }

  isAuth(): boolean {
    if (!this.accessToken) {
      this.apiUserData = this.localStorageService.getItem('userApiData')!;
      this.accessToken = this.localStorageService.getItem('accessToken')!;
      this.refreshToken = this.localStorageService.getItem('refreshToken')!;
    }

    return !!this.accessToken;
  }

  saveTokens(userApiData: IAuth): void {
    this.apiUserData = userApiData;
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
    this.apiUserData = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

}