declare module 'passport-discord' {
  import { Profile } from 'passport';
  import { Strategy as PassportStrategy } from 'passport-strategy';

  export interface DiscordProfile extends Profile {
    discriminator?: string;
    email?: string;
    avatar?: string;
  }

  export interface StrategyOptions {
    clientID?: string;
    clientSecret?: string;
    callbackURL?: string;
    scope?: string[];
  }

  export class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptions,
      verify?: (...args: unknown[]) => void
    );
  }
}
