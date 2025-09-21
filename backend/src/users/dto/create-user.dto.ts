import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'MiContraseña123!',
    description: 'Contraseña del usuario'
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({ example: 25, description: 'Edad del usuario' })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el usuario está activo'
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
