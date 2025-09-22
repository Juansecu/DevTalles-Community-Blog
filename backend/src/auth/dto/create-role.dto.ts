import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsInt
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Administrador',
    maxLength: 30
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(30, { message: 'El nombre no puede exceder 30 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descripción breve del rol',
    example: 'Rol con acceso a todas las funcionalidades del sistema',
    maxLength: 100
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(100, { message: 'La descripción no puede exceder 100 caracteres' })
  description: string;

  @ApiProperty({
    description:
      'Lista opcional de IDs de permisos que se asociarán al rol en su creación',
    example: [1, 2, 3],
    required: false,
    type: [Number]
  })
  @IsOptional()
  @IsArray({ message: 'Los permisos deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'El arreglo de permisos no puede estar vacío' })
  @IsInt({ each: true, message: 'Cada permiso debe ser un número entero' })
  permissionIds?: number[];
}
