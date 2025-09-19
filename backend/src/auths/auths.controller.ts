import { Controller, Get, Req, UseGuards, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthsService } from './auths.service';
import { setAuthCookie } from '../utils/cookie.util';
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

    setAuthCookie(res, token); // 👈 ya no repites lógica
    return { message: 'Login exitoso', user };
  }

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async redirectToDiscord() {
    // Passport redirige automáticamente a Discord
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordCallback(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const token = await this.authService.generateJwt(user);
    setAuthCookie(res, token); 
    return { message: 'Login con Discord exitoso', user };
  }
}
