import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  LoginDto,
  AuthResponse,
  AuthUser,
  LoginResponse
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl || 'http://localhost:3000';

  // Signals para el estado de autenticación
  private _currentUser = signal<AuthUser | null>(null);
  private _isAuthenticated = signal<boolean>(false);
  private _token = signal<string | null>(null);

  // Getters públicos de solo lectura
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly token = this._token.asReadonly();

  constructor() {
    this.loadStoredAuth();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this._token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    });
  }

  /**
   * Cargar autenticación almacenada en localStorage
   */
  private loadStoredAuth(): void {
    try {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);
        this._token.set(storedToken);
        this._currentUser.set(user);
        this._isAuthenticated.set(true);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      this.clearStoredAuth();
    }
  }

  /**
   * Guardar autenticación en localStorage
   */
  private saveAuth(user: AuthUser, token: string): void {
    try {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving auth:', error);
    }
  }

  /**
   * Limpiar autenticación almacenada
   */
  private clearStoredAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginDto): Promise<AuthResponse> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials, {
          headers
        })
      );

      // Actualizar estado de autenticación
      this._currentUser.set(response.user);
      this._token.set(response.token);
      this._isAuthenticated.set(true);

      // Guardar en localStorage
      this.saveAuth(response.user, response.token);

      return {
        success: true,
        user: response.user,
        token: response.token,
        message: 'Inicio de sesión exitoso'
      };
    } catch (error: unknown) {
      console.error('Error en login:', error);

      let errorMessage = 'Error interno del servidor';

      if (error && typeof error === 'object' && 'error' in error) {
        const apiError = error as {
          error?: { message?: string | string[] };
          status?: number;
        };

        if (apiError?.error?.message) {
          if (Array.isArray(apiError.error.message)) {
            errorMessage = apiError.error.message.join(', ');
          } else {
            errorMessage = apiError.error.message;
          }
        } else if (apiError?.status === 401) {
          errorMessage = 'Email o contraseña incorrectos';
        } else if (apiError?.status === 400) {
          errorMessage = 'Datos de inicio de sesión inválidos';
        } else if (apiError?.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }
      }

      return {
        success: false,
        message: 'Error al iniciar sesión',
        error: errorMessage
      };
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      // Si hay un endpoint de logout en el backend, llamarlo aquí
      // await firstValueFrom(this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers: this.getAuthHeaders() }));
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar estado local
      this._currentUser.set(null);
      this._token.set(null);
      this._isAuthenticated.set(false);
      this.clearStoredAuth();

      // Redirigir al login
      this.router.navigate(['/login']);
    }
  }

  /**
   * Verificar si el token es válido
   */
  async verifyToken(): Promise<boolean> {
    const token = this._token();
    if (!token) {
      return false;
    }

    try {
      const headers = this.getAuthHeaders();

      // Llamar a un endpoint que verifique el token (si existe)
      await firstValueFrom(this.http.get(`${this.apiUrl}/auth/verify`, { headers }));

      return true;
    } catch (error) {
      console.error('Token inválido:', error);
      await this.logout();
      return false;
    }
  }

  /**
   * Obtener información del usuario actual
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    if (!this._isAuthenticated()) {
      return null;
    }

    try {
      const headers = this.getAuthHeaders();

      const user = await firstValueFrom(
        this.http.get<AuthUser>(`${this.apiUrl}/auth/me`, { headers })
      );

      this._currentUser.set(user);
      return user;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      await this.logout();
      return null;
    }
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole(_role: string): boolean {
    // const user = this._currentUser();
    // Implementar lógica de roles si está disponible en el usuario
    return false; // Por ahora retorna false hasta implementar roles
  }

  /**
   * Verificar si el usuario tiene un permiso específico
   */
  hasPermission(_permission: string): boolean {
    // const user = this._currentUser();
    // Implementar lógica de permisos si está disponible en el usuario
    return false; // Por ahora retorna false hasta implementar permisos
  }

  /**
   * Obtener el ID del usuario actual
   */
  getCurrentUserId(): number | null {
    const user = this._currentUser();
    return user?.userId || null;
  }

  /**
   * Iniciar login con Discord
   * Redirige al usuario al endpoint de autorización de Discord
   */
  async loginWithDiscord(): Promise<void> {
    try {
      console.log('Iniciando login con Discord...');
      // Guardar la URL actual para regresar después del login
      const returnUrl = this.router.url;
      localStorage.setItem('discord_return_url', returnUrl);

      // Redirigir al endpoint de Discord
      window.location.href = `${this.apiUrl}/auth/discord`;
    } catch (error) {
      console.error('Error iniciando login con Discord:', error);
    }
  }

  /**
   * Manejar el callback de Discord
   * Procesa la respuesta de autenticación y extrae el token
   */
  async handleDiscordCallback(): Promise<AuthResponse> {
    try {
      console.log('Procesando callback de Discord...');

      const currentUrl = new URL(window.location.href);
      const error = currentUrl.searchParams.get('error');

      if (error) {
        return {
          success: false,
          message: 'Error en la autenticación con Discord',
          error: error
        };
      }
      const headers = this.getHeaders();

      // Si no hay error, intentamos obtener los datos del usuario desde el backend
      // El backend debería haber establecido una sesión o token

      const response = await firstValueFrom(
        this.http.get<LoginResponse>(`${this.apiUrl}/auth/discord/callback`, {
          headers,
          withCredentials: true
        })
      );

      console.log(response);

      this._currentUser.set(response.user);
      this._token.set(response.token);
      this._isAuthenticated.set(true);

      this.saveAuth(response.user, response.token);

      console.log('Usuario autenticado con Discord:', response.user);
      console.log('Token guardado:', response.token);

      return {
        success: true,
        user: response.user,
        token: response.token,
        message: 'Autenticación con Discord exitosa'
      };
    } catch (error: unknown) {
      console.error('Error en callback de Discord:', error);

      let errorMessage = 'Error en la autenticación con Discord';

      if (error && typeof error === 'object' && 'error' in error) {
        const apiError = error as {
          error?: { message?: string | string[] };
          status?: number;
        };

        if (apiError?.error?.message) {
          if (Array.isArray(apiError.error.message)) {
            errorMessage = apiError.error.message.join(', ');
          } else {
            errorMessage = apiError.error.message;
          }
        } else if (apiError?.status === 401) {
          errorMessage = 'No se pudo autenticar con Discord';
        } else if (apiError?.status === 400) {
          errorMessage = 'Error en los datos de Discord';
        } else if (apiError?.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }
      }

      return {
        success: false,
        message: 'Error en la autenticación con Discord',
        error: errorMessage
      };
    }
  }

  /**
   * Obtener la URL de retorno después del login con Discord
   */
  getDiscordReturnUrl(): string {
    const returnUrl = localStorage.getItem('discord_return_url') || '/';
    localStorage.removeItem('discord_return_url');
    return returnUrl;
  }
}
