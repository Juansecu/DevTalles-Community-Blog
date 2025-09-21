import { IsString, IsEmail, IsDateString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario (único)'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'juanp',
    description: 'Nombre de usuario (único)',
    minLength: 3,
    maxLength: 32
  })
  @IsString()
  @Length(3, 32)
  username: string;

  @ApiProperty({
    example: 'MiContraseña123!',
    description: 'Contraseña del usuario (se almacena encriptada)'
  })
  @IsString()
  @Length(6, 60) // puedes ajustar longitud mínima/máxima
  password: string;

  @ApiProperty({
    example: '1995-06-15',
    description: 'Fecha de nacimiento en formato YYYY-MM-DD'
  })
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    example: 'Juan',
    description: 'Primer nombre del usuario',
    maxLength: 50
  })
  @IsString()
  @Length(1, 50)
  firstName: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
    maxLength: 70
  })
  @IsString()
  @Length(1, 70)
  lastName: string;
}
