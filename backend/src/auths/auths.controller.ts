import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthsService } from './auths.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthsController {
  constructor(private readonly authService: AuthsService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.validateUser(email, password);

    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Guardamos el JWT en una cookie HttpOnly
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // solo en https en prod
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return { message: 'Login exitoso', user };
  }
}
