import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
