import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../home-page/home-page.component').then(c => c.HomePageComponent) 
  },
  { 
    path: 'users', 
    loadComponent: () => import('../users-page/users-page.component').then(c => c.UsersPageComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('../not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent) 
  }
]