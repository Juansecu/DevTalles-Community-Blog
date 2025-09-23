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
      const posts = await this.postService.getAllPosts();
      this.posts.set(posts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.categoriesService.getAllCategories();
      this.categories.set(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  postClickeable(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }

  async togglePostLike(postId: number, event: Event): Promise<void> {
    // Prevenir que se navegue al post cuando se hace clic en el botón de like
    event.stopPropagation();

    try {
      const result = await this.postService.toggleLike(postId);

      if (result.success) {
        // Actualizar el post específico en la lista
        const currentPosts = this.posts();
        const updatedPosts = currentPosts.map(post =>
          post.postId === postId
            ? { ...post, likesCount: result.likes, isLiked: !post.isLiked }
            : post
        );
        this.posts.set(updatedPosts);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }
}
