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

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn({ name: 'Post_id' })
  postId: number;

  @Column({ name: 'Title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'Body', type: 'text' })
  body: string;

  @Column({ name: 'Banner_url', type: 'varchar', length: 100 })
  bannerUrl: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  @JoinColumn({ name: 'User_id' })
  author: User;

  @OneToMany(() => PostComment, comment => comment.post)
  comments: PostComment[];

  @CreateDateColumn({ name: 'Posted_at', type: 'timestamp' })
  postedAt: Date;

  @UpdateDateColumn({ name: 'Updated_at', type: 'timestamp' })
  updatedAt: Date;
}
