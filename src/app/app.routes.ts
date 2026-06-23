import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { authGuard } from '../features/auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../home-page/home-page.component').then(c => c.HomePageComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'login', 
    loadComponent: () => import('../features/auth/auth.component').then(c => c.AuthComponent),
  },
  { 
    path: 'users', 
    loadComponent: () => import('../users-page/users-page.component').then(c => c.UsersPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'posts/create',
    loadComponent: () => import('../features/posts/post-create/post-create.component').then(c => c.PostCreateComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'posts/:id', 
    loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(c => c.PostDetailComponent),
    resolve: { post: postResolver },
    canActivate: [authGuard]
  },
  { 
    path: 'posts', 
    loadComponent: () => import('../features/posts/posts.component').then(c => c.PostsComponent),
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    loadComponent: () => import('../not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent),
  }
]