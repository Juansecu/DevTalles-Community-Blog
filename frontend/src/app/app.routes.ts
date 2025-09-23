import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { SinglePostComponent } from './pages/post/post';
import { AdminComponent } from './pages/admin/admin/admin';
import { DiscordCallbackComponent } from './pages/discord-callback/discord-callback.component';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth/discord/callback',
    component: DiscordCallbackComponent
  }
];
