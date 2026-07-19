import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../interface/ILogin';
import { IToken } from '../interface/IToken';
import { IAuthUser } from '../interface/IAuthUser';
import { APP_CONFIG } from '../../../app-setup.token';
import { IAppConfig } from '../../../interface/IAppConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  private APP_CONFIG: IAppConfig = inject(APP_CONFIG);
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/auth';

  login(loginData: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/login`, {
      username: loginData.username,
      password: loginData.password,
      expiresInMins: this.APP_CONFIG.sessionTimeout
    });
  }

  getUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.apiUrl }/me`);
  }

  refreshToken(auth: IToken): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/refresh`, {
      refreshToken: `${ auth.refreshToken }`,
      expiresInMins: this.APP_CONFIG.sessionTimeout
    });
  }

}