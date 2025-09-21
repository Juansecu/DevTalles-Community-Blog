import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';

export const Access = (roles: string[] = [], permissions: string[] = []) => {
  return (
    SetMetadata(ROLES_KEY, roles) && SetMetadata(PERMISSIONS_KEY, permissions)
  );
};
