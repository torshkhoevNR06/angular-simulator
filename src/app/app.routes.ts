import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { authGuard } from '../features/auth/auth.guard';
import { adminGuard } from '../features/auth/admin.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('../features/auth/auth.component').then(c => c.AuthComponent),
  },
  {
    path: '',
    loadComponent: () => import('../main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
      { 
        path: '',
        loadComponent: () => import('../home-page/home-page.component').then(c => c.HomePageComponent),
      },
      { 
        path: 'users', 
        canActivate: [adminGuard],
        loadComponent: () => import('../users-page/users-page.component').then(c => c.UsersPageComponent),
      },
      {
        path: 'posts/create',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/posts/post-create/post-create.component').then(c => c.PostCreateComponent),
      },
      { 
        path: 'posts/:id', 
        canActivate: [adminGuard],
        loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(c => c.PostDetailComponent),
        resolve: { post: postResolver },
      },
      { 
        path: 'posts', 
        canActivate: [adminGuard],
        loadComponent: () => import('../features/posts/posts.component').then(c => c.PostsComponent),
      },
      { 
        path: '**', 
        loadComponent: () => import('../not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent),
      }
    ],
    canActivate: [authGuard]
  },
]