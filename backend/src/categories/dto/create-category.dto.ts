import { IsNumber, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nombre de la categoría', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'ID del usuario que agrega la categoría',
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  addedById: number;
}
