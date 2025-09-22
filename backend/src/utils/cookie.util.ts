import { Response } from 'express';

export function setAuthCookie(res: Response, token: string) {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.SECURE_AUTHENTICATION_COOKIES === 'true',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  });
}
