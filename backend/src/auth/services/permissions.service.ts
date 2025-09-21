import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>
  ) {}

  // 🔹 Crear permiso
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepo.create(createPermissionDto);
    return await this.permissionRepo.save(permission);
  }

  // 🔹 Obtener todos los permisos
  async findAll(): Promise<Permission[]> {
    return await this.permissionRepo.find();
  }

  // 🔹 Obtener un permiso por id
  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepo.findOne({
      where: { permissionId: id }
    });
    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }
    return permission;
  }

  // 🔹 Actualizar un permiso
  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto
  ): Promise<Permission> {
    const permission = await this.findOne(id);
    const updated = this.permissionRepo.merge(permission, updatePermissionDto);
    return await this.permissionRepo.save(updated);
  }

  // 🔹 Eliminar un permiso
  async remove(id: number): Promise<void> {
    const result = await this.permissionRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }
  }
}
