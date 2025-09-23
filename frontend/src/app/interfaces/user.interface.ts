export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthdate: string;
  registeredAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmation: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  birthdate: string; // Format: YYYY-MM-DD
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  user?: User;
  error?: string;
}
