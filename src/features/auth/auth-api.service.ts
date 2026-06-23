import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth } from './IAuth';
import { Observable } from 'rxjs';
import type { ITokenResponse } from './ITokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/auth';

  getUser(auth: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${ this.apiUrl }/login`, auth);
  }

  getMe(): Observable<ITokenResponse> {
    return this.http.get<ITokenResponse>(`${ this.apiUrl }/me`);
  }

  getRefreshToken(auth: ITokenResponse): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${ this.apiUrl }/refresh`, {
      refreshToken: `${ auth.refreshToken }`
    });
  }

}