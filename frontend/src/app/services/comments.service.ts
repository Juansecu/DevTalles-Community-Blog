import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { PostComment } from '../interfaces/posts.interface';

export interface CreateCommentDto {
  content: string;
  postId: number;
  authorId: number;
}

export interface UpdateCommentDto {
  content?: string;
}

export interface CommentsResponse {
  data: PostComment[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Obtener todos los comentarios con filtros opcionales
   */
  async getAllComments(postId?: number, page = 1, limit = 10): Promise<PostComment[]> {
    try {
      console.log('Obteniendo comentarios del backend...');

      const headers = this.getHeaders();
      let params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

      // Agregar filtro por postId si se proporciona
      if (postId) {
        params = params.set('postId', postId.toString());
      }

      const response = await firstValueFrom(
        this.http.get<CommentsResponse>(`${this.apiUrl}/post-comments`, { headers, params })
      );

      console.log('Comentarios recibidos del backend:', response);

      // Extraer el array de comentarios de la respuesta paginada
      if (response && Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response)) {
        // En caso de que el backend devuelva directamente un array
        return response as PostComment[];
      } else {
        console.warn('Backend devolvió estructura incorrecta para comentarios:', response);
        return [];
      }
    } catch (error) {
      console.error('Error obteniendo comentarios del backend:', error);
      return [];
    }
  }

  /**
   * Obtener un comentario por ID
   */
  async getComment(id: number): Promise<PostComment | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.get<PostComment>(`${this.apiUrl}/post-comments/${id}`, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error obteniendo comentario:', error);
      return null;
    }
  }

  /**
   * Crear un nuevo comentario
   */
  async createComment(commentData: CreateCommentDto): Promise<PostComment | null> {
    try {
      console.log('Creando nuevo comentario:', commentData);

      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.post<PostComment>(`${this.apiUrl}/post-comments`, commentData, { headers })
      );

      console.log('Comentario creado exitosamente:', response);
      return response;
    } catch (error) {
      console.error('Error creando comentario:', error);
      return null;
    }
  }

  /**
   * Actualizar un comentario
   */
  async updateComment(id: number, commentData: UpdateCommentDto): Promise<PostComment | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.put<PostComment>(`${this.apiUrl}/post-comments/${id}`, commentData, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error actualizando comentario:', error);
      return null;
    }
  }

  /**
   * Eliminar un comentario
   */
  async deleteComment(id: number): Promise<boolean> {
    try {
      const headers = this.getHeaders();

      await firstValueFrom(
        this.http.delete(`${this.apiUrl}/post-comments/${id}`, { headers })
      );

      return true;
    } catch (error) {
      console.error('Error eliminando comentario:', error);
      return false;
    }
  }

  /**
   * Obtener comentarios por postId específico
   */
  async getCommentsByPost(postId: number): Promise<PostComment[]> {
    return this.getAllComments(postId);
  }
}