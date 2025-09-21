import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('Permissions')
export class Permission {
  @PrimaryGeneratedColumn('increment', {
    name: 'Permission_id',
    type: 'integer'
  })
  permissionId: number;

  @Column({
    name: 'Name',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true
  })
  name: string;

  @Column({
    name: 'Description',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  description: string;

  @CreateDateColumn({
    name: 'Added_at',
    type: 'datetime',
    nullable: false,
    update: false
  })
  addedAt: Date;

  @UpdateDateColumn({
    name: 'Updated_at',
    type: 'datetime',
    nullable: false
  })
  updatedAt: Date;
}
