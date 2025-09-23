import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'Category_id' })
  categoryId: number;

  @Column({ name: 'Name', type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => User, user => user.categories, { nullable: false })
  @JoinColumn({ name: 'Added_by' })
  addedBy: User;

  @CreateDateColumn({ name: 'Added_at', type: 'timestamp' })
  addedAt: Date;

  @UpdateDateColumn({ name: 'Updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Post, post => post.categories)
  @JoinTable({
    name: 'Post_categories',
    joinColumn: { name: 'Category_id', referencedColumnName: 'categoryId' },
    inverseJoinColumn: { name: 'Post_id', referencedColumnName: 'postId' }
  })
  posts: Post[];
}
