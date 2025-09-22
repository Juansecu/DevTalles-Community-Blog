import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity('Roles')
export class Role {
  // 🔑 ID autoincremental
  @PrimaryGeneratedColumn({ name: 'Role_id' })
  roleId: number;

  // 🔹 Nombre del rol (máx 30 caracteres)
  @Column({
    name: 'Name',
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true
  })
  name: string;

  // 🔹 Descripción del rol (máx 100 caracteres)
  @Column({
    name: 'Description',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  description: string;

  @Column({
    name: 'Access_level',
    type: 'int',
    nullable: false,
    default: 1
  })
  accessLevel: number;

  // 🔹 Fecha de creación (no se actualiza nunca)
  @CreateDateColumn({
    name: 'Added_at',
    type: 'timestamp',
    nullable: false,
    update: false
  })
  addedAt: Date;

  // 🔹 Fecha de última actualización
  @UpdateDateColumn({
    name: 'Updated_at',
    type: 'timestamp',
    nullable: false
  })
  updatedAt: Date;

  // 🔹 Relación Many-to-Many con permisos
  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'Role_permissions', // nombre de la tabla intermedia
    joinColumn: {
      name: 'Role_id',
      referencedColumnName: 'roleId'
    },
    inverseJoinColumn: {
      name: 'Permission_id',
      referencedColumnName: 'permissionId' // propiedad en Permission
    }
  })
  permissions: Permission[];
}
