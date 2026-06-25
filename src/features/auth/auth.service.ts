import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, concatMap, Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ILogin } from './ILogin';
import { IToken } from './IToken';
import { IAuthUser } from './IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();

  getToken(): IToken | null {
    return this.localStorageService.getItem('tokenResponse');
  }
  
  login(loginData: ILogin): Observable<IAuthUser> {
    return this.authApiService.getToken(loginData).pipe(
      tap((token: IToken) => {
        this.localStorageService.setItem('tokenResponse', {
          accessToken: token.accessToken, 
          refreshToken: token.refreshToken 
        });
      }),
      concatMap(() => this.authApiService.getAuthUser().pipe(
        tap((authUser: IAuthUser) => this.authUserSubject.next(authUser))
      ))
    )
  }

  authRefreshToken(): Observable<IToken> {
    return this.authApiService.getRefreshToken(this.getToken()!).pipe(
      tap((tokenResponse: IToken) => {
        return this.localStorageService.setItem('tokenResponse', tokenResponse);
      })
    )
  }

  isAuth(): boolean {
    return !!this.getToken()?.accessToken;
  }

  logout(): void {
    this.localStorageService.removeItem('tokenResponse');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}