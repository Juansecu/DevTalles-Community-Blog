export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  registeredAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  token?: string;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}
