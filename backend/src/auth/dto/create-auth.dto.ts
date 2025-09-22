import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    name: 'email',
    example: 'juan@example.com',
    description: 'Email del usuario',
    maxLength: 100
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @MaxLength(100, { message: 'El email debe tener máximo 100 caracteres' })
  email: string;

  @ApiProperty({
    name: 'password',
    example: 'MiContraseña123!',
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 32
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  @MaxLength(32, { message: 'La contraseña debe tener maximo 32 caracteres' })
  password: string;
}
