import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

export const adminGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  
  const router: Router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  return router.navigate(['']);
};