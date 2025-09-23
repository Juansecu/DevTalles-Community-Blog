import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/posts.service';
import { CategoriesService } from '../../services/categories.service';
import { Post } from '../../interfaces/posts.interface';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  private router = inject(Router);
  private postService = inject(PostService);
  private categoriesService = inject(CategoriesService);

  posts = signal<Post[]>([]);
  categories = signal<Category[]>([]);

  constructor() {
    this.getAllPosts();
    this.getAllCategories();
  }

  async getAllPosts() {
    try {
      console.log('PostsComponent: Cargando posts...');
      const posts = await this.postService.getAllPosts();
      console.log('PostsComponent: Posts recibidos:', posts);

      // Verificar que posts sea un array
      if (Array.isArray(posts)) {
        this.posts.set(posts);
        console.log('PostsComponent: Posts configurados correctamente');
      } else {
        console.error('PostsComponent: Posts no es un array:', posts);
        this.posts.set([]);
      }
    } catch (error) {
      console.error('PostsComponent: Error loading posts:', error);
      this.posts.set([]);
    }
  }

  async getAllCategories() {
    try {
      console.log('PostsComponent: Cargando categorías...');
      const categories = await this.categoriesService.getAllCategories();
      console.log('PostsComponent: Categorías recibidas:', categories);

      // Verificar que categories sea un array
      if (Array.isArray(categories)) {
        this.categories.set(categories);
        console.log('PostsComponent: Categorías configuradas correctamente');
      } else {
        console.error('PostsComponent: Categories no es un array:', categories);
        this.categories.set([]);
      }
    } catch (error) {
      console.error('PostsComponent: Error loading categories:', error);
      this.categories.set([]);
    }
  }

  postClickeable(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }
}
