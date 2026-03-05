import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { UsersPageComponent } from '../users-page/users-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '**', component: NotFoundPageComponent }
]