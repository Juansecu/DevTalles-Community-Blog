import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { DiscordUser } from '../typings/auth-user';

export interface DiscordProfile {
  id: string;
  username: string;
  discriminator?: string;
  email?: string;
  avatar?: string;
}
@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      callbackURL: process.env.DISCORD_CALLBACK_URL as string,
      scope: ['identify', 'email']
    });
  }
  validate(
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
    done: (err: Error | null, user?: DiscordUser) => void
  ): void {
    if (!profile.id) {
      return done(new Error('Discord ID not found'));
    }
    if (!profile.email) {
      return done(new Error('Discord email not found'));
    }

    const user: DiscordUser = {
      id: profile.id,
      email: profile.email,
      username: `${profile.username}${profile.discriminator ? '#' + profile.discriminator : ''}`,
      avatar: profile.avatar,
      discordId: profile.id,
      accessToken,
      refreshToken
    };

    done(null, user);
  }
}
