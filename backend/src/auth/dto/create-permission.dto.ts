import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'READ_USERS',
    description: 'Nombre del permiso (máx. 50 caracteres)',
    maxLength: 50
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
  name: string;

  @ApiProperty({
    example: 'Permite leer información de los usuarios',
    description: 'Descripción detallada del permiso (máx. 100 caracteres)',
    maxLength: 100
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Length(1, 100, {
    message: 'La descripción debe tener entre 1 y 100 caracteres.'
  })
  description: string;
}
