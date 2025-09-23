export interface Author {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface Category {
  categoryId: number;
  name: string;
  addedBy: Author;
  addedAt: Date;
  updatedAt: Date;
}

export interface PostComment {
  id: number;
  content: string;
  author: Author;
  postedAt: Date;
  updatedAt: Date;
}

export interface Post {
  postId: number;
  title: string;
  body: string;
  bannerUrl: string;
  likesCount: number;
  author: Author;
  comments?: PostComment[];
  postedAt: Date;
  updatedAt: Date;
  isLiked?: boolean; // Campo calculado del frontend
}

export interface Posts extends Post {
  // Alias para compatibilidad con componentes existentes
  id: number;
  description: string;
  category: string[];
  image: string;
  likes?: number;
}

export interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface CreatePostDto {
  title: string;
  body: string;
  bannerUrl: string;
  authorId: number;
}

export interface UpdatePostDto {
  title?: string;
  body?: string;
  bannerUrl?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
  isTeamMember?: boolean;
}
