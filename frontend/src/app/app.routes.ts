import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { SinglePostComponent } from './pages/post/post';
import { AdminComponent } from './pages/admin/admin/admin';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];
