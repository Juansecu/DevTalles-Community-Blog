import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login con la URL de retorno
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Si ya está autenticado, redirigir a la página principal
  router.navigate(['/']);
  return false;
};
