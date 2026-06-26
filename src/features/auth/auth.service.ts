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
    return this.localStorageService.getItem('token');
  }
  
  login(loginData: ILogin): Observable<IAuthUser> {
    return this.authApiService.login(loginData).pipe(
      tap((token: IToken) => {
        this.localStorageService.setItem('token', {
          accessToken: token.accessToken, 
          refreshToken: token.refreshToken 
        });
      }),
      concatMap(() => this.authApiService.getUser()
        .pipe(
          tap((authUser: IAuthUser) => this.authUserSubject.next(authUser))
      ))
    );
  }

  refreshToken(): Observable<IToken> {
    return this.authApiService.refreshToken(this.getToken()!)
      .pipe(
        tap((token: IToken) => {
          return this.localStorageService.setItem('token', token);
      })
    );
  }

  isAuth(): boolean {
    return !!this.getToken()?.accessToken;
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}