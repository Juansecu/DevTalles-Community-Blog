export interface AuthUser {
  userId: number;
  email: string;
  username?: string;
  avatar?: string;
}

export interface DiscordUser extends AuthUser {
  discordId: string;
  accessToken: string;
  refreshToken: string;
}
