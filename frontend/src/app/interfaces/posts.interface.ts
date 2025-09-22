export interface Posts {
  id: number;
  title: string;
  description: string;
  category: string[];
  image: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  categories: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
  isTeamMember?: boolean;
}
