import { IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
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

  @ApiProperty({ description: 'URL del banner', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bannerUrl: string;

  @ApiProperty({ description: 'ID del autor' })
  @IsNumber()
  authorId: number;
}
