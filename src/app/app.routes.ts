import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { UsersPageComponent } from '../users-page/users-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'not-found-page', component: NotFoundPageComponent },
  { path: 'user-page', component: UsersPageComponent },
  { path: '**', component: NotFoundPageComponent }
]