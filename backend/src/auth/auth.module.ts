import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { RolesService } from './services/roles.service';
import { AuthsController } from './auth.controller';

import { UsersModule } from '../users/users.module';
import { DiscordStrategy } from './strategies/discord.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cargar variables de entorno
    UsersModule,
    TypeOrmModule.forFeature([Role, Permission, User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'SUPER_SECRET_KEY',
        signOptions: { expiresIn: '1h' }
      })
    })
  ],
  providers: [
    AuthService,
    PermissionsService,
    RolesService,
    DiscordStrategy,
    JwtStrategy
  ],
  controllers: [AuthsController],
  exports: [AuthService, JwtModule]
})
export class AuthsModule {}
