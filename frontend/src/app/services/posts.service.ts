import { Injectable } from '@angular/core';
import { Posts } from '../interfaces/posts.interface';

export const MOCK_POSTS: Posts[] = [
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
];

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getAllPosts(): Promise<Posts[]> {
    return Promise.resolve(MOCK_POSTS);
  }

  getPost(id: number): Promise<Posts | undefined> {
    const post = MOCK_POSTS.find(p => p.id === id);
    return Promise.resolve(post);
  }
}
