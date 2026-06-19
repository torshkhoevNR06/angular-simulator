import { Component, inject, type OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { PluralPipe } from '../pipes/plural.pipe'

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent, PluralPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private messageService: MessageService = inject(MessageService);
  userService: UserService = inject(UserService);

  private filteredSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  users$: Observable<IUser[]> = this.userService.users$;

  usersCount!: number;

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.users$, 
    this.filteredSubject
  ]).pipe(
    map(([users, name]: [IUser[], string]) => {
      return users.filter((user: IUser) => 
        user.name.trim().toLowerCase().includes(name))
    }),
    tap((users: IUser[]) => setTimeout(() => {
      this.usersCount = users.length;
    }))
  );
    
  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }
  
  onAddUser(user: IUser): void {
    this.messageService.showSuccess('Пользователь добавлен');
    this.userService.addUser(user);
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  onChangeFilter(name: string): void {
    this.filteredSubject.next(name);
  }

}