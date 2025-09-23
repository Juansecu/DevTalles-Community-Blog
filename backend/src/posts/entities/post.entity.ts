import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PostComment } from 'src/post-comments/entities/post-comment.entity';
import { PostLike } from './post-like.entity';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn({ name: 'Post_id' })
  postId: number;

  @Column({ name: 'Title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'Body', type: 'text', nullable: false })
  body: string;

  @Column({ name: 'Banner_url', type: 'varchar', length: 100 })
  bannerUrl: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  @JoinColumn({ name: 'Author_id' })
  author: User;

  @OneToMany(() => PostComment, comment => comment.post)
  comments: PostComment[];

  @CreateDateColumn({ name: 'Posted_at', type: 'timestamp', nullable: false })
  postedAt: Date;

  @UpdateDateColumn({ name: 'Updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToMany(() => PostLike, like => like.postId)
  likes: PostLike[];
}
