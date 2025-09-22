import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  /**
   * Crear un nuevo rol con permisos opcionales
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, permissionIds } = createRoleDto;

    // ⚡ Validar permisos si se envían
    let permissions: Permission[] = [];
    if (permissionIds?.length) {
      permissions = await this.permissionRepository.find({
        where: { permissionId: In(permissionIds) }
      });

      if (permissions.length !== permissionIds.length) {
        throw new BadRequestException('Algunos permisos no existen');
      }
    }

    const role = this.roleRepository.create({
      name,
      description,
      permissions
    });

    return this.roleRepository.save(role);
  }

  /**
   * Listar todos los roles con sus permisos
   */
  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  /**
   * Obtener un rol por ID
   */
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { roleId: id },
      relations: ['permissions']
    });
    if (!role) throw new NotFoundException(`Rol #${id} no encontrado`);
    return role;
  }

  /**
   * Actualizar rol y sus permisos
   */
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { name, description, permissionIds } = updateRoleDto;

    const role = await this.roleRepository.findOne({
      where: { roleId: id },
      relations: ['permissions']
    });
    if (!role) throw new NotFoundException(`Rol #${id} no encontrado`);

    if (name) role.name = name;
    if (description) role.description = description;

    if (permissionIds) {
      const permissions = await this.permissionRepository.find({
        where: { permissionId: In(permissionIds) }
      });

      if (permissions.length !== permissionIds.length) {
        throw new BadRequestException('Algunos permisos no existen');
      }

      role.permissions = permissions;
    }

    return this.roleRepository.save(role);
  }

  /**
   * Eliminar un rol
   */
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol #${id} no encontrado`);
    }
    return { message: `Rol #${id} eliminado correctamente` };
  }
}
