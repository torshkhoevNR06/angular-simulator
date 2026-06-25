import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin } from './ILogin';
import { Observable } from 'rxjs';
import { IToken } from './IToken';
import type { IAuthUser } from './IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/auth';

  getToken(loginData: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/login`, loginData);
  }

  getAuthUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.apiUrl }/me`);
  }

  getRefreshToken(auth: IToken): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/refresh`, {
      refreshToken: `${ auth.refreshToken }`
    });
  }

}