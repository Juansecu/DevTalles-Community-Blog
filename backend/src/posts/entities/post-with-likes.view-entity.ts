import { ViewEntity, ViewColumn } from 'typeorm';

export interface PostCommentAuthor {
  userId: number;
  username: string;
}

export interface PostCommentView {
  postCommentId: number;
  content: string;
  postedAt: Date;
  updatedAt: Date;
  author: PostCommentAuthor;
}

@ViewEntity({
  name: 'Post_with_likes',
  synchronize: false // The view is managed by migrations
})
export class PostWithLikesViewEntity {
  @ViewColumn({ name: 'Post_id' })
  postId: number;

  @ViewColumn({ name: 'Title' })
  title: string;

  @ViewColumn({ name: 'Body' })
  body: string;

  @ViewColumn({ name: 'Banner_url' })
  bannerUrl: string;

  @ViewColumn({ name: 'Author_id' })
  authorId: number;

  @ViewColumn({ name: 'Author_username' })
  authorUsername: string;

  @ViewColumn({ name: 'Posted_at' })
  postedAt: Date;

  @ViewColumn({ name: 'Updated_at' })
  updatedAt: Date;

  @ViewColumn({ name: 'Likes_count' })
  likesCount: number;

  @ViewColumn({ name: 'Categories' })
  categories: string[];

  @ViewColumn({ name: 'Comments' })
  comments: PostCommentView[];
}
