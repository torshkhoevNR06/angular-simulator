import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { IUser } from '../interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  http: HttpClient = inject(HttpClient);
  
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
  
}