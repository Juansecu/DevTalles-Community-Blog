import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ default: true })
  isActive: boolean;

  // Relación con roles
  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'user_roles', // tabla intermedia
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  // Relación con permisos directos
  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'user_permissions', // tabla intermedia
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}