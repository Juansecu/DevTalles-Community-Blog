import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { Permission } from '../../auth/entities/permission.entity';
import { Role } from '../../auth/entities/role.entity';

@Entity('Users')
export class User {
  @PrimaryColumn({
    name: 'User_id',
    type: 'integer'
  })
  userId: number;

  @Column({
    name: 'First_name',
    type: 'varchar',
    length: 50,
    nullable: false
  })
  firstName: string;

  @Column({
    name: 'Last_name',
    type: 'varchar',
    length: 70,
    nullable: false
  })
  lastName: string;

  @Column({
    name: 'Email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    name: 'Username',
    type: 'varchar',
    length: 32,
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    name: 'Password',
    type: 'varchar',
    length: 60,
    nullable: false
  })
  password: string;

  @Column({
    name: 'Birthdate',
    type: 'date',
    nullable: false
  })
  birthdate: Date;

  @CreateDateColumn({
    name: 'Registered_at',
    type: 'timestamp',
    nullable: false,
    update: false
  })
  registeredAt: Date;

  @UpdateDateColumn({
    name: 'Updated_at',
    type: 'timestamp',
    nullable: true
  })
  updatedAt: Date;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'User_id', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'Role_id', referencedColumnName: 'roleId' }
  })
  roles: Role[];

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
