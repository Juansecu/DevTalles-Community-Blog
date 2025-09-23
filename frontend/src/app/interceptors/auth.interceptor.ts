import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  // Agregar token a las peticiones si existe
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(authReq).pipe(
      catchError(error => {
        // Si el token es inválido (401), hacer logout
        if (error.status === 401) {
          authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
