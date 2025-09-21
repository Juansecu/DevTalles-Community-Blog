import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  // 🔹 Crear permiso
  create(createPermissionDto: CreatePermissionDto): string {
    return 'This action adds a new permission';
  }

  // 🔹 Obtener todos los permisos
  findAll(): string {
    return 'This action returns all permissions';
  }

  // 🔹 Obtener un permiso por id
  findOne(id: number): string {
    return `This action returns a #${id} permission`;
  }

  // 🔹 Actualizar un permiso
  update(id: number, updatePermissionDto: UpdatePermissionDto): string {
    return `This action updates a #${id} permission`;
  }

  // 🔹 Eliminar un permiso
  remove(id: number): string {
    return `This action removes a #${id} permission`;
  }
}
