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
    image: '/example.jpg',
    likes: 24,
    isLiked: false
  },
  {
    id: 2,
    title: 'Post 2',
    description: 'Description for Post 2',
    category: ['Category 2'],
    image: '/example.jpg',
    likes: 12,
    isLiked: false
  },
  {
    id: 3,
    title: 'Post 3',
    description: 'Description for Post 3',
    category: ['Category 3'],
    image: '/example.jpg',
    likes: 8,
    isLiked: true
  },
  {
    id: 4,
    title: 'Post 4',
    description: 'Description for Post 4',
    category: ['Category 4'],
    image: '/example.jpg',
    likes: 35,
    isLiked: false
  },
  {
    id: 5,
    title: 'Post 5',
    description: 'Description for Post 5',
    category: ['Category 5'],
    image: '/example.jpg',
    likes: 19,
    isLiked: true
  },
  {
    id: 6,
    title: 'Post 6',
    description: 'Description for Post 6',
    category: ['Category 6'],
    image: '/example.jpg',
    likes: 7,
    isLiked: false
  },
  {
    id: 7,
    title: 'Post 7',
    description: 'Description for Post 7',
    category: ['Category 1', 'Category 4'],
    image: '/example.jpg',
    likes: 15,
    isLiked: true
  },
  {
    id: 8,
    title: 'Post 8',
    description: 'Description for Post 8',
    category: ['Category 2', 'Category 5'],
    image: '/example.jpg',
    likes: 3,
    isLiked: false
  },
  {
    id: 9,
    title: 'Post 9',
    description: 'Description for Post 9',
    category: ['Category 3', 'Category 6'],
    image: '/example.jpg',
    likes: 42,
    isLiked: false
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

  createPost(post: Omit<Posts, 'id'>): Promise<Posts> {
    const newPost: Posts = {
      id: Date.now(),
      ...post
    };

    console.log('Creating post:', newPost);
    MOCK_POSTS.push(newPost);

    return Promise.resolve(newPost);
  }

  updatePost(id: number, post: Partial<Posts>): Promise<Posts | null> {
    const index = MOCK_POSTS.findIndex(p => p.id === id);

    if (index === -1) {
      return Promise.resolve(null);
    }

    MOCK_POSTS[index] = { ...MOCK_POSTS[index], ...post };

    console.log('Updating post:', MOCK_POSTS[index]);

    return Promise.resolve(MOCK_POSTS[index]);
  }

  deletePost(id: number): Promise<boolean> {
    const index = MOCK_POSTS.findIndex(p => p.id === id);

    if (index === -1) {
      return Promise.resolve(false);
    }

    MOCK_POSTS.splice(index, 1);

    console.log('Deleted post with id:', id);

    return Promise.resolve(true);
  }

  async toggleLike(id: number): Promise<{ likes: number; isLiked: boolean } | null> {
    const post = MOCK_POSTS.find(p => p.id === id);

    if (!post) {
      return Promise.resolve(null);
    }

    // Toggle del estado like
    post.isLiked = !post.isLiked;

    // Actualizar contador de likes
    if (post.isLiked) {
      post.likes = (post.likes || 0) + 1;
    } else {
      post.likes = Math.max((post.likes || 1) - 1, 0);
    }

    console.log(
      `Post ${id} ${post.isLiked ? 'liked' : 'unliked'}. Total likes: ${post.likes}`
    );

    return Promise.resolve({
      likes: post.likes,
      isLiked: post.isLiked
    });
  }

  getLikesCount(id: number): Promise<number> {
    const post = MOCK_POSTS.find(p => p.id === id);
    return Promise.resolve(post?.likes || 0);
  }

  isPostLiked(id: number): Promise<boolean> {
    const post = MOCK_POSTS.find(p => p.id === id);
    return Promise.resolve(post?.isLiked || false);
  }
}
