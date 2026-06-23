import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { IAuth } from './IAuth';

let isRefreshing: boolean = false;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);

  if (!authService.accessToken) {
    return next(req);
  }

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next); 
  }

  const modifiedReq: HttpRequest<unknown> = addToken(req, authService.accessToken);
  
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return refreshAndProceed(authService, req, next).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
      }
      
      return throwError(() => error);
    })
  )
};

const refreshAndProceed = (authService: AuthService, req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;
    
    return authService.authRefreshToken()
      .pipe(
        switchMap((auth: IAuth) => {
          isRefreshing = false;
          return next(addToken(req, auth.accessToken));
        }),
        catchError((error: HttpErrorResponse) => {
          authService.logout();
          return throwError(() => error);
        }),
        finalize(() => isRefreshing = false)
      );
  }

  return next(addToken(req, authService.accessToken!));
}

const addToken = (req: HttpRequest<unknown>, accessToken: string) => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${ accessToken }`)
  });
}