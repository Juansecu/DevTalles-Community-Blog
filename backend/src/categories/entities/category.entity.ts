import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'Category_id' })
  categoryId: number;

  @Column({ name: 'Name', type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => User, user => user.categories, { nullable: false })
  @JoinColumn({ name: 'User_id' })
  addedBy: User;

  @CreateDateColumn({ name: 'Added_at', type: 'timestamp' })
  addedAt: Date;

  @UpdateDateColumn({ name: 'Updated_at', type: 'timestamp' })
  updatedAt: Date;
}
