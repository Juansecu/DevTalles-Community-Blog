import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from '../../auth/entities/role.entity';
import { Permission } from '../../auth/entities/permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'User_id' })
  userId: number;

  @Column({ name: 'Email', unique: true, length: 100 })
  email: string;

  @Column({ name: 'Username', length: 32 })
  username: string;

  @Column({ name: 'Password', length: 60 })
  password: string;

  @Column({ name: 'Birthdate', type: 'date' })
  birthdate: Date;

  @Column({ name: 'First_name', length: 50 })
  firstName: string;

  @Column({ name: 'Last_name', length: 70 })
  lastName: string;

  @CreateDateColumn({ name: 'Registered_at' })
  registeredAt: Date;

  @UpdateDateColumn({ name: 'Updated_at' })
  updatedAt: Date;

  // Relación con roles
  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'User_roles',
    joinColumn: { name: 'User_id', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'User_role', referencedColumnName: 'roleId' }
  })
  roles: Role[];

  // Relación con permisos directos
  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'User_permissions',
    joinColumn: { name: 'User_id', referencedColumnName: 'userId' },
    inverseJoinColumn: {
      name: 'Permission_id',
      referencedColumnName: 'permissionId'
    }
  })
  permissions: Permission[];
}
