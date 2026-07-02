import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../interface/ILogin';
import { IToken } from '../interface/IToken';
import { IAuthUser } from '../interface/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/auth';

  login(loginData: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/login`, loginData);
  }

  getUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.apiUrl }/me`);
  }

  refreshToken(auth: IToken): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/refresh`, {
      refreshToken: `${ auth.refreshToken }`
    });
  }

}