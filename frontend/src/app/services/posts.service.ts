import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Post,
  CreatePostDto,
  UpdatePostDto,
  PostsResponse
} from '../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Obtener todos los posts con paginación
   */
  async getAllPosts(page = 1, limit = 10): Promise<Post[]> {
    try {
      console.log('Intentando conectar con backend en:', `${this.apiUrl}/posts`);

      const headers = this.getHeaders();
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

      const response = await firstValueFrom(
        this.http.get<PostsResponse>(`${this.apiUrl}/posts`, { headers, params })
      );

      console.log('Datos recibidos del backend:', response);

      // Extraer el array de posts de la respuesta paginada
      if (response && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn(
          'Backend devolvió estructura incorrecta, usando fallback:',
          response
        );
        return this.getMockPostsAsPost();
      }
    } catch (error) {
      console.warn('Backend no disponible, usando datos mock:', error);
      return this.getMockPostsAsPost(); // Fallback a datos mock
    }
  }

  /**
   * Obtener un post específico por ID
   */
  async getPost(id: number): Promise<Post | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.get<Post>(`${this.apiUrl}/posts/${id}`, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  /**
   * Crear un nuevo post
   */
  async createPost(postData: CreatePostDto): Promise<Post | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.post<Post>(`${this.apiUrl}/posts`, postData, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  }

  /**
   * Actualizar un post existente
   */
  async updatePost(id: number, postData: UpdatePostDto): Promise<Post | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.put<Post>(`${this.apiUrl}/posts/${id}`, postData, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  }

  /**
   * Eliminar un post
   */
  async deletePost(id: number): Promise<boolean> {
    try {
      const headers = this.getHeaders();

      await firstValueFrom(this.http.delete(`${this.apiUrl}/posts/${id}`, { headers }));

      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  }

  /**
   * Toggle like en un post
   */
  async toggleLike(postId: number): Promise<{ success: boolean; likes: number }> {
    try {
      // TODO: Implementar endpoint de likes cuando esté disponible en el backend
      // Por ahora, simular el comportamiento
      const post = await this.getPost(postId);
      if (post) {
        const newLikes = post.isLiked ? post.likesCount - 1 : post.likesCount + 1;
        return { success: true, likes: newLikes };
      }
      return { success: false, likes: 0 };
    } catch (error) {
      console.error('Error toggling like:', error);
      return { success: false, likes: 0 };
    }
  }

  /**
   * Obtener cantidad de likes de un post
   */
  async getLikesCount(postId: number): Promise<number> {
    try {
      const post = await this.getPost(postId);
      return post?.likesCount || 0;
    } catch (error) {
      console.error('Error getting likes count:', error);
      return 0;
    }
  }

  /**
   * Datos mock como Post[] para el nuevo formato
   */
  private getMockPostsAsPost(): Post[] {
    return [
      {
        postId: 1,
        title: 'Post de ejemplo',
        body: 'Este es un post de ejemplo mientras se conecta con el backend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bannerUrl: '/example.jpg',
        likesCount: 24,
        isLiked: false,
        author: {
          userId: 1,
          firstName: 'Usuario',
          lastName: 'Ejemplo',
          username: 'ejemplo',
          email: 'ejemplo@test.com'
        },
        postedAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}
