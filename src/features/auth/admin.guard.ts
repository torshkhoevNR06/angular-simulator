import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from './Role';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

export const adminGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  
  const router: Router = inject(Router);
  
  if (!localStorageService.getItem('role')) {
    return router.navigate(['/login']);
  }

  if (Role.ADMIN === authService.isAdmin()) {
    return true;
  }

  return router.navigate(['']);
};