import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import type { DiscordProfile } from 'passport-discord'; // viene del .d.ts que creamos

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({ 
      clientID: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      callbackURL: process.env.DISCORD_CALLBACK_URL as string,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    // Si por seguridad quieres evitar errores de tipo en runtime:
    const p = profile as any;

    const id = p.id;
    const username = p.username;
    const discriminator = p.discriminator ?? '';
    const email = p.email ?? null;
    const avatar = p.avatar ?? null;

    const user = {
      discordId: id,
      username: `${username}${discriminator ? '#' + discriminator : ''}`,
      email,
      avatar,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
