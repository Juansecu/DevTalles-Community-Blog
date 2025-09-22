import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('Post_comments')
export class PostComment {
  @PrimaryGeneratedColumn({ name: 'Post_comment_id' })
  postCommentId: number;

  @Column({ name: 'Content', type: 'text' })
  content: string;

  // Comentario padre (opcional)
  @ManyToOne(() => PostComment, comment => comment.children, {
    nullable: true
  })
  @JoinColumn({ name: 'Parent_id' })
  parent?: PostComment | null;

  // Comentarios hijos
  @OneToMany(() => PostComment, comment => comment.parent)
  children?: PostComment[];

  // Autor del comentario
  @ManyToOne(() => User, user => user.comments, { nullable: false })
  @JoinColumn({ name: 'User_id' })
  author: User;

  // Post al que pertenece
  @ManyToOne(() => Post, post => post.comments, { nullable: false })
  @JoinColumn({ name: 'Post_id' })
  post: Post;

  @CreateDateColumn({ name: 'Posted_at', type: 'timestamp' })
  postedAt: Date;

  @UpdateDateColumn({ name: 'Updated_at', type: 'timestamp' })
  updatedAt: Date;
}
