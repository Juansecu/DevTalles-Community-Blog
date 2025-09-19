import { Response } from 'express';

export function setAuthCookie(res: Response, token: string) {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1h
  });
}