import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const isLoggedIn: boolean = inject(AuthService).isAuth();

  if (isLoggedIn) {
    return true;
  }

  return router.navigate(['/login']);
};