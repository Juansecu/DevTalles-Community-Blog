import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(private readonly jwtService: JwtService) {}

  // 🔹 Login normal (email + password)
  async validateUser(email: string, password: string) {
    // Aquí validas con tu DB real
    const user = { id: 1, email, username: 'UsuarioPrueba' };

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.generateJwt(user);
    return { user, token };
  }

  // 🔹 Método compartido para generar el JWT
  generateJwt(user: any): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  // 🔹 Login con Discord (Passport ya te da el perfil en req.user)
  async validateDiscordUser(profile: any) {
    const user = {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      avatar: profile.avatar,
    };

    const token = this.generateJwt(user);
    return { user, token };
  }
}
