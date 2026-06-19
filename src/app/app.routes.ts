import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';

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
    path: 'posts/create',
    loadComponent: () => import('../features/posts/post-create/post-create.component').then(c => c.PostCreateComponent)
  },
  { 
    path: 'posts/:id', 
    loadComponent: () => import('../features/posts/post-detail/post-detail.component').then(c => c.PostDetailComponent),
    resolve: { post: postResolver }
  },
  { 
    path: 'posts', 
    loadComponent: () => import('../features/posts/posts.component').then(c => c.PostsComponent),
  },
  { 
    path: '**', 
    loadComponent: () => import('../not-found-page/not-found-page.component').then(c => c.NotFoundPageComponent) 
  }
]