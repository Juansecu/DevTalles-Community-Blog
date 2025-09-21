import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

import { MatchFields } from '../../shared/decorators/match-fields.validator';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre(s) del usuario',
    example: 'Juan José',
    maxLength: 50
  })
  @IsNotEmpty({
    message: 'El nombre no debe estar vacío'
  })
  @IsString()
  @MaxLength(50, {
    message: 'El nombre no debe exceder los 50 caracteres'
  })
  firstName: string;

  @ApiProperty({
    description: 'Apellido(s) del usuario',
    example: 'Pérez Gómez',
    maxLength: 70
  })
  @IsNotEmpty({
    message: 'El apellido no debe estar vacío'
  })
  @IsString()
  @MaxLength(70, {
    message: 'El apellido no debe exceder los 70 caracteres'
  })
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
    maxLength: 100
  })
  @IsEmail()
  @MaxLength(100, {
    message: 'El correo no debe exceder los 100 caracteres'
  })
  email: string;

  @MatchFields('email', { message: 'La confirmación del email debe coincidir' })
  @ApiProperty({
    description: 'Confirmacion del correo electrónico del usuario',
    example: 'juan@example.com',
    maxLength: 100
  })
  @IsEmail()
  @MaxLength(100, {
    message: 'La confirmación del correo no debe exceder los 100 caracteres'
  })
  emailConfirmation: string;

  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'juan123',
    maxLength: 32,
    minLength: 4
  })
  @MaxLength(32, {
    message: 'El nombre de usuario no debe exceder los 32 caracteres'
  })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos 4 caracteres'
  })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'MiContraseña123!',
    maxLength: 32,
    minLength: 8
  })
  @MaxLength(32, {
    message: 'La contraseña no debe exceder los 32 caracteres'
  })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres'
  })
  password: string;

  @MatchFields('password', {
    message: 'La confirmación de contraseña debe coincidir'
  })
  @ApiProperty({
    description: 'Confirmar Contraseña del usuario',
    example: 'MiContraseña123!',
    maxLength: 32,
    minLength: 8
  })
  @MaxLength(32, {
    message:
      'La Confirmacion de la contraseña no debe exceder los 32 caracteres'
  })
  @MinLength(8, {
    message: 'La Confirmacion de la contraseña debe tener al menos 8 caracteres'
  })
  passwordConfirmation: string;
  @ApiProperty({
    description: 'Fecha de nacimiento del usuario (YYYY-MM-DD)',
    format: 'date',
    pattern: 'yyyy-MM-dd',
    type: String
  })
  @IsDateString()
  birthdate: number;
}
