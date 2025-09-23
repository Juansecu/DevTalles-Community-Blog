import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateUserDto, CreateUserResponse, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl || 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Crear un nuevo usuario
   */
  async createUser(
    userData: CreateUserDto,
    captchaToken: string
  ): Promise<CreateUserResponse> {
    try {
      let headers = this.getHeaders();
      headers = headers.set('X-Captcha-Token', captchaToken);

      const response = await firstValueFrom(
        this.http.post<User>(`${this.apiUrl}/users`, userData, { headers })
      );

      return {
        success: true,
        message: 'Usuario creado exitosamente',
        user: response
      };
    } catch (error: unknown) {
      console.error('Error creando usuario:', error);

      let errorMessage = 'Error interno del servidor';

      if (error && typeof error === 'object' && 'error' in error) {
        const apiError = error as {
          error?: { message?: string | string[] };
          status?: number;
        };
        // Error del backend con mensaje específico
        if (apiError?.error?.message) {
          if (Array.isArray(apiError.error.message)) {
            errorMessage = apiError.error.message.join(', ');
          } else {
            errorMessage = apiError.error.message;
          }
        } else if (apiError?.status === 400) {
          errorMessage = 'Datos de usuario inválidos';
        } else if (apiError?.status === 409) {
          errorMessage = 'El usuario ya existe';
        } else if (apiError?.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }
      }

      return {
        success: false,
        message: 'Error al crear usuario',
        error: errorMessage
      };
    }
  }

  /**
   * Obtener todos los usuarios (requiere autenticación)
   */
  async getAllUsers(token?: string): Promise<User[]> {
    try {
      let headers = this.getHeaders();

      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      const response = await firstValueFrom(
        this.http.get<User[]>(`${this.apiUrl}/users`, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  }

  /**
   * Obtener un usuario por ID
   */
  async getUserById(id: number): Promise<User | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }

  /**
   * Validar disponibilidad de username
   */
  async checkUsernameAvailability(username: string): Promise<{ available: boolean }> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.get<{ available: boolean }>(
          `${this.apiUrl}/users/check-username/${username}`,
          { headers }
        )
      );

      return response;
    } catch (error) {
      console.error('Error verificando username:', error);
      return { available: false };
    }
  }

  /**
   * Validar disponibilidad de email
   */
  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.get<{ available: boolean }>(
          `${this.apiUrl}/users/check-email/${email}`,
          { headers }
        )
      );

      return response;
    } catch (error) {
      console.error('Error verificando email:', error);
      return { available: false };
    }
  }
}
