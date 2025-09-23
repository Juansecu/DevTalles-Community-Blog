import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  IsBase64
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Título del post', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'Contenido del post' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'Banner en formato Base64',
    type: String,
    format: 'base64'
  })
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  banner: string;

  @ApiProperty({
    description: 'IDs de las categorías del post',
    type: Number,
    isArray: true
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty({ each: true })
  @Min(1, { each: true })
  categoryIds: number[];
}
