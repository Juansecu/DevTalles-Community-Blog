import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';

export const Access =
  (roles: string[] = [], permissions: string[] = []) =>
  (
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<unknown>
  ): void => {
    SetMetadata(ROLES_KEY, roles)(target, key, descriptor);
    SetMetadata(PERMISSIONS_KEY, permissions)(target, key, descriptor);
  };
