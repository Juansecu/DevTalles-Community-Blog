import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  @Matches(
    new RegExp(
      '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};\':"\\\\|,.<>/?]).+$'
    ),
    {
      message:
        'La contraseña debe contener al menos una mayúscula, un número y un símbolo especial'
    }
  )
  password: string;
}
