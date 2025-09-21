import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  @MaxLength(32, { message: 'La contraseña debe tener maximo 32 caracteres' })
  password: string;
}
