import { Request } from 'express';
import { AuthUser } from '../typings/auth-user';

export interface RequestWithUser extends Request {
  user: AuthUser;
}
