import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/resolver/post.resolver';
import { adminGuard } from '../core/guard/admin.guard';
import { authGuard } from '../core/guard/auth.guard';
import { productResolver } from '../features/products/resolver/product.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../features/auth/auth.component').then((c) => c.AuthComponent)
  },
  {
    path: '',
    loadComponent: () => import('../core/ui/main-layout/main-layout.component').then((c) => c.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../features/home-page/home-page.component').then((c) => c.HomePageComponent)
      },
      {
        path: 'cd',
        canActivate: [adminGuard],
        loadComponent: () => import('../sandbox/homework-28/components/parent/parent.component').then((c) => c.ParentComponent)
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/users-page/users-page.component').then((c) => c.UsersPageComponent)
      },
      {
        path: 'posts/create',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/posts/layout/post-create/post-create.component').then((c) => c.PostCreateComponent)
      },
      {
        path: 'posts/:id',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/posts/layout/post-detail/post-detail.component').then((c) => c.PostDetailComponent),
        resolve: { post: postResolver }
      },
      {
        path: 'posts',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/posts/posts.component').then((c) => c.PostsComponent)
      },
      {
        path: 'recipes',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/recipes/recipes.component').then((c) => c.RecipesComponent)
      },
      {
        path: 'products/:id',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/products/components/product-detail/product-detail.component').then((c) => c.ProductDetailComponent),
        resolve: { product: productResolver }
      },
      {
        path: 'products',
        canActivate: [adminGuard],
        loadComponent: () => import('../features/products/products.component').then((c) => c.ProductsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('../features/products/components/product-cart/product-cart.component').then((c) => c.CartComponent)
      },
      {
        path: '**',
        loadComponent: () => import('../core/page/not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent)
      }
    ],
    canActivate: [authGuard]
  }
];