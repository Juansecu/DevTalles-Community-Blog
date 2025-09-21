import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AuthUser } from '../typings/auth-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // 🔹 Login con email + password
  async validateUser(
    email: string,
    password: string
  ): Promise<{ user: AuthUser; token: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['userId', 'email', 'password']
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const safeUser: AuthUser = {
      id: user.userId,
      email: user.email
    };

    const token = this.generateJwt(safeUser);
    return { user: safeUser, token };
  }

  // 🔹 Login con Discord
  validateDiscordUser(profile: AuthUser): { user: AuthUser; token: string } {
    const user: AuthUser = {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      avatar: profile.avatar
    };

    const token = this.generateJwt(user);
    return { user, token };
  }

  // 🔹 Método público para generar un token
  public createToken(user: AuthUser): string {
    return this.generateJwt(user);
  }

  // 🔹 Generar JWT internamente
  private generateJwt(user: AuthUser): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
