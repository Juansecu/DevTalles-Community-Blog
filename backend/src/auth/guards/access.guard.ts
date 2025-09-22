import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ROLES_KEY, PERMISSIONS_KEY } from '../decorators/access.decorator';
import { User } from '../../users/entities/user.entity';
import { RequestWithUser } from '../typings/request-with-user';
import { Role } from '../entities/role.entity';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]) || [];

    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass()
      ]) || [];

    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const [roles, userEntity] = await Promise.all([
      this.roleRepository.find({
        select: ['name', 'accessLevel'],
        where: { name: In(requiredRoles) },
        relations: ['permissions']
      }),
      this.userRepository.findOne({
        where: { userId: user.userId },
        relations: ['roles', 'roles.permissions', 'permissions']
      })
    ]);

    if (!userEntity) return false;

    const userRoles = userEntity.roles.map(r => r.name);
    const userPermissions = new Set(
      userEntity.permissions
        .map(p => p.name)
        .concat(
          ...userEntity.roles.flatMap(r => r.permissions.map(p => p.name))
        )
    );
    const userRoleWithHighestAccessLevel: Role = userEntity.roles.reduce(
      (prev: Role, current: Role): Role =>
        prev.accessLevel > current.accessLevel ? prev : current,
      { accessLevel: -1 } as Role
    );

    const hasRole =
      requiredRoles.length === 0 ||
      requiredRoles.some(role => userRoles.includes(role)) ||
      roles.some(
        role => role.accessLevel > userRoleWithHighestAccessLevel.accessLevel
      );
    const hasPermission =
      requiredPermissions.length === 0 ||
      requiredPermissions.some(perm => userPermissions.has(perm));

    if (!hasRole)
      Logger.error('Access denied: Missing required role', AccessGuard.name);

    if (!hasPermission)
      Logger.error(
        'Access denied: Missing required permission',
        AccessGuard.name
      );

    return hasRole && hasPermission;
  }
}
