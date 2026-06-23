import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth } from './IAuth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/auth';

  getUser(auth: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${ this.apiUrl }/login`, auth);
  }

  getMe(): Observable<IAuth> {
    return this.http.get<IAuth>(`${ this.apiUrl }/me`);
  }

  getRefreshToken(auth: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${ this.apiUrl }/refresh`, {
      refreshToken: `${ auth.refreshToken }`
    });
  }

}