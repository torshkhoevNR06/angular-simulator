import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, of } from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { LoaderService } from '../../../core/ui/loader/service/loader.service';
import { LocalStorageService } from '../../../shared/service/local-storage.service';
import { IUser } from '../interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loaderService: LoaderService = inject(LoaderService);
  private userApiService: UserApiService = inject(UserApiService);
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
    const usersFromStorage: IUser[] = this.localStorageService.getItem('users') ?? [];

    if (usersFromStorage.length !== 0) {
      return of(usersFromStorage);
    } else {
      this.loaderService.showLoader();
      
      return this.userApiService.getUsers()
        .pipe(
          finalize(() => this.loaderService.hideLoader())
        );
    }
  }

}