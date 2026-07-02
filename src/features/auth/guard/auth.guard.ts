import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  
  const router: Router = inject(Router);

  if (authService.isAuth()) {
    return true;
  }

  return router.navigate(['/login']);
};