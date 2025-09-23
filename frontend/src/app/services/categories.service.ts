import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
} from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Obtener todas las categorías con paginación
   */
  async getAllCategories(page = 1, limit = 10): Promise<Category[]> {
    try {
      const headers = this.getHeaders();
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

      const response = await firstValueFrom(
        this.http.get<Category[]>(`${this.apiUrl}/categories`, { headers, params })
      );

      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return this.getMockCategories(); // Fallback a datos mock
    }
  }

  /**
   * Obtener una categoría específica por ID
   */
  async getCategory(id: number): Promise<Category | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.get<Category>(`${this.apiUrl}/categories/${id}`, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  /**
   * Crear una nueva categoría
   */
  async createCategory(categoryData: CreateCategoryDto): Promise<Category | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.post<Category>(`${this.apiUrl}/categories`, categoryData, { headers })
      );

      return response;
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  }

  /**
   * Actualizar una categoría existente
   */
  async updateCategory(
    id: number,
    categoryData: UpdateCategoryDto
  ): Promise<Category | null> {
    try {
      const headers = this.getHeaders();

      const response = await firstValueFrom(
        this.http.put<Category>(`${this.apiUrl}/categories/${id}`, categoryData, {
          headers
        })
      );

      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  }

  /**
   * Eliminar una categoría
   */
  async deleteCategory(id: number): Promise<boolean> {
    try {
      const headers = this.getHeaders();

      await firstValueFrom(
        this.http.delete(`${this.apiUrl}/categories/${id}`, { headers })
      );

      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  /**
   * Obtener categorías populares o más utilizadas
   */
  async getPopularCategories(limit = 5): Promise<Category[]> {
    try {
      const allCategories = await this.getAllCategories(1, 50);
      // TODO: Implementar lógica para determinar popularidad basada en uso en posts
      return allCategories.slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      return [];
    }
  }

  /**
   * Buscar categorías por nombre
   */
  async searchCategories(query: string): Promise<Category[]> {
    try {
      const allCategories = await this.getAllCategories(1, 100);
      return allCategories.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching categories:', error);
      return [];
    }
  }

  /**
   * Datos mock para fallback (mantener compatibilidad)
   */
  private getMockCategories(): Category[] {
    return [
      {
        categoryId: 1,
        name: 'Angular',
        addedBy: {
          userId: 1,
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin'
        },
        addedAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        name: 'React',
        addedBy: {
          userId: 1,
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin'
        },
        addedAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        name: 'Vue.js',
        addedBy: {
          userId: 1,
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin'
        },
        addedAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        name: 'Node.js',
        addedBy: {
          userId: 1,
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin'
        },
        addedAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 5,
        name: 'TypeScript',
        addedBy: {
          userId: 1,
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin'
        },
        addedAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}
