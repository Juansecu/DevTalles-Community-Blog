import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';  
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from '../users/users.module';
import { DiscordStrategy } from './strategies/discord.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret', 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthsService, DiscordStrategy],
  controllers: [AuthsController],
  exports: [AuthsService, JwtModule],
})
export class AuthsModule {}
