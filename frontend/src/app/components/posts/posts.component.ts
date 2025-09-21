import { Component, computed, Inject, Signal } from '@angular/core';
import { Router } from '@angular/router';

export interface Post {
  id: number;
  title: string;
  description: string;
  category: string[];
  image: string;
}

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  private router = Inject(Router);

  posts: Signal<Post[]> = computed(() => [
    {
      id: 1,
      title: 'Post 1',
      description: 'Description for Post 1',
      category: [
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4',
        'Category 5',
        'Category 6'
      ],
      image: '/example.jpg'
    },
    {
      id: 2,
      title: 'Post 2',
      description: 'Description for Post 2',
      category: ['Category 2'],
      image: '/example.jpg'
    },
    {
      id: 3,
      title: 'Post 3',
      description: 'Description for Post 3',
      category: ['Category 3'],
      image: '/example.jpg'
    },
    {
      id: 4,
      title: 'Post 4',
      description: 'Description for Post 4',
      category: ['Category 4'],
      image: '/example.jpg'
    },
    {
      id: 5,
      title: 'Post 5',
      description: 'Description for Post 5',
      category: ['Category 5'],
      image: '/example.jpg'
    },
    {
      id: 6,
      title: 'Post 6',
      description: 'Description for Post 6',
      category: ['Category 6'],
      image: '/example.jpg'
    },
    {
      id: 7,
      title: 'Post 7',
      description: 'Description for Post 7',
      category: ['Category 1', 'Category 4'],
      image: '/example.jpg'
    },
    {
      id: 8,
      title: 'Post 8',
      description: 'Description for Post 8',
      category: ['Category 2', 'Category 5'],
      image: '/example.jpg'
    },
    {
      id: 9,
      title: 'Post 9',
      description: 'Description for Post 9',
      category: ['Category 3', 'Category 6'],
      image: '/example.jpg'
    }
  ]);

  allCategories: Signal<string[]> = computed(() => {
    return [
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria',
      'Categoria'
    ];
  });

  postClickeable(postId: number): void {
    console.log('postId', postId);
    this.router.navigate(['/posts', postId]);
  }
}
