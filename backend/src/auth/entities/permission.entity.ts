import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn({ name: 'Permission_id' }) // 🔹 Auto Increment
  permissionId: number;

  @Column({
    name: 'Name',
    type: 'varchar',
    length: 50,
    nullable: false // 🔹 Required
  })
  name: string;

  @Column({
    name: 'Description',
    type: 'varchar',
    length: 100,
    nullable: false // 🔹 Required
  })
  description: string;

  @CreateDateColumn({
    name: 'Added_at',
    type: 'timestamp',
    update: false // 🔹 No se actualiza nunca
  })
  addedAt: Date;

  @UpdateDateColumn({
    name: 'Updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
}
