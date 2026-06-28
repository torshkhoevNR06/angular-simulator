import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, concatMap, Observable, tap } from 'rxjs';
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
  
  restoreAuthState(): Observable<IAuthUser | IToken> {
    if (this.getToken()) {
      return this.authApiService.getUser()
        .pipe(
          tap((authUser: IAuthUser) => this.authUserSubject.next(authUser)),
          catchError(() => this.refreshToken())
        );  
    }

    return this.refreshToken();
  }
  
  login(loginData: ILogin): Observable<IAuthUser> {
    return this.authApiService.login(loginData)
      .pipe(
        tap((token: IToken) => {
          this.localStorageService.setItem('token', {
            accessToken: token.accessToken, 
            refreshToken: token.refreshToken 
          });
        }),
        concatMap(() => this.authApiService.getUser()
          .pipe(
            tap((authUser: IAuthUser) => {
            this.authUserSubject.next(authUser);
            this.localStorageService.setItem('role', authUser.role);
          })
        ))
      );
  }

  refreshToken(): Observable<IToken> {
    return this.authApiService.refreshToken(this.getToken()!)
      .pipe(
        tap((token: IToken) => {
          this.restoreAuthState();
          return this.localStorageService.setItem('token', token);
        })
    );
  }

  isAuth(): boolean {
    return !!this.authUserSubject.value;
  }

  isAdmin(): string {
    let role: string = this.authUserSubject.getValue()!.role;
    
    if (!role) {
      role = this.localStorageService.getItem('role')!;
    }

    return role;
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('role');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}