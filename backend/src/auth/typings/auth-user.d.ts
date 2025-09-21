export interface AuthUser {
  userId: string | number;
  email: string;
  username?: string;
  avatar?: string;
}

export interface DiscordUser extends AuthUser {
  discordId: string;
  accessToken: string;
  refreshToken: string;
}
