import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { Post } from './post.entity';

@Entity('Post_likes')
export class PostLike {
  @PrimaryColumn({ name: 'Post_id', type: 'int', nullable: false })
  postId: number;

  @PrimaryColumn({ name: 'User_id', type: 'int', nullable: false })
  userId: number;

  @CreateDateColumn({
    name: 'Liked_at',
    type: 'timestamp',
    nullable: false,
    update: false
  })
  likedAt: Date;

  @UpdateDateColumn({ name: 'Updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Post, post => post.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'Post_id', referencedColumnName: 'postId' })
  post: Post;
}
