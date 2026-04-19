import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private loaderService: LoaderService = inject(LoaderService);
  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  addUser(user: IUser): void {
    const users: IUser[] = this.getUsers();
    this.setUsers([user, ...users]);
  }

  deleteUser(id: number): void {
    const filteredUsers: IUser[] = this.getUsers().filter((user: IUser) => user.id !== id);
    this.setUsers(filteredUsers);
  }

  setUsers(users: IUser[]): void {
    this.localStorageService.setItem('users', users);
    this.usersSubject.next(users);
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const usersFromStorage: IUser[] = this.localStorageService.getItem('users') ?? this.getUsers();
    
    if (usersFromStorage.length !== 0) {
      return of(usersFromStorage);
    } else {
      this.loaderService.showLoader();
      
      return this.userApiService.getUsers()
        .pipe(
          catchError(() => {
            this.messageService.showError('404 Not Found');
            return of([]);
          }),
          finalize(() => this.loaderService.hideLoader())
        );
    }
  }

}