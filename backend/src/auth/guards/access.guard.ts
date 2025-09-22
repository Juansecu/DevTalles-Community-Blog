import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, PERMISSIONS_KEY } from '../decorators/access.decorator';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestWithUser } from '../typings/RequestWithUser';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
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

    const userEntity = await this.userRepository.findOne({
      where: { userId: user.userId },
      relations: ['roles', 'permissions']
    });

    if (!userEntity) return false;

    const userRoles = userEntity.roles.map(r => r.name);
    const userPermissions = userEntity.permissions.map(p => p.name);

    const hasRole =
      requiredRoles.length === 0 ||
      requiredRoles.some(role => userRoles.includes(role));
    const hasPermission =
      requiredPermissions.length === 0 ||
      requiredPermissions.some(perm => userPermissions.includes(perm));

    return hasRole && hasPermission;
  }
}
