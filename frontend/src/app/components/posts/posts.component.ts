import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/posts.service';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  private router = inject(Router);
  private postService = inject(PostService);

  posts = signal<Posts[]>([]);

  constructor() {
    this.getAllPosts();
  }

  async getAllPosts() {
    try {
      const posts = await this.postService.getAllPosts();
      this.posts.set(posts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  allCategories: Signal<string[]> = computed(() => {
    const posts = this.posts();
    const categories = posts.flatMap(post => post.category);
    return [...new Set(categories)];
  });

  postClickeable(postId: number): void {
    console.log(postId);
    this.router.navigate(['/posts', postId]);
  }
}
