import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Contraseña actual del usuario',
    example: 'MiContraseñaActual123'
  })
  @IsString({ message: 'La contraseña actual debe ser un texto' })
  @MinLength(8, {
    message: 'La contraseña actual debe tener al menos 8 caracteres'
  })
  @MaxLength(50, {
    message: 'La contraseña actual no puede superar los 50 caracteres'
  })
  currentPassword: string;

  @ApiProperty({
    description: 'Nueva contraseña',
    example: 'NuevaContraseñaSegura456'
  })
  @IsString({ message: 'La nueva contraseña debe ser un texto' })
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres'
  })
  @MaxLength(50, {
    message: 'La nueva contraseña no puede superar los 50 caracteres'
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, {
    message:
      'La nueva contraseña debe contener mayúsculas, minúsculas y números'
  })
  newPassword: string;

  @ApiProperty({
    description: 'Confirmación de la nueva contraseña',
    example: 'NuevaContraseñaSegura456'
  })
  @IsString({ message: 'La confirmación de la contraseña debe ser un texto' })
  @MinLength(8, { message: 'La confirmación debe tener al menos 8 caracteres' })
  @MaxLength(50, {
    message: 'La confirmación no puede superar los 50 caracteres'
  })
  newPasswordConfirmation: string;
}
