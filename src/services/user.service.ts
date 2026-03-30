import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private loaderService: LoaderService = inject(LoaderService);
  private userApiService: UserApiService = inject(UserApiService);
  private userMessageService: MessageService = inject(MessageService);
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.userApiService.getUsers()
    .pipe(
      catchError(() => {
        this.userMessageService.showError('404 Not Found');
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader())
    )
  }

}