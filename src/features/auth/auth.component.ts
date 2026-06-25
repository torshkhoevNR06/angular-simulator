import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { LoaderService } from '../../services/loader.service';
import { ILogin } from './ILogin';
import { HttpErrorResponse } from '@angular/common/http';
import type { IAuthUser } from './IAuthUser';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private authUser$ = this.authService.authUser$;

  username!: string;

  authForm: FormGroup = this.fb.group({
    username: ['emilys', Validators.required],
    password: ['emilyspass', Validators.required]
  });

  onAuthForm(): void {
    if (this.authForm.valid) {
      const username: string = this.authForm.get('username')?.value;
      this.loaderService.showLoader();
      
      this.authService.login(this.authForm.value).pipe(
        tap(() => {
          this.authUser$.pipe(
            tap((user: IAuthUser | null) => this.username = user!.username)
          )
          this.isValidLogin(username, this.username);
          this.router.navigate(['']);
          this.messageService.showInfo('Вы авторизовались');
        }),
        catchError((error: HttpErrorResponse) => {
          this.isValidLogin(username, this.username);
          this.messageService.showError(`Ошибка ${ error.status }: Вы ввели не верный username`);
          return throwError(() => error);
        }),
        finalize(() => this.loaderService.hideLoader())
      ).subscribe();
    } else {
      this.messageService.showError('Форма не валидна');
    }
  }

  isValidLogin(usernameForm: string, usernameApi: string) {
    if (usernameForm !== usernameApi) {
      this.authForm.get('username')?.setErrors({ mismatch: true });
    } else {
      this.authForm.get('username')?.setErrors(null);
    }
  }

}