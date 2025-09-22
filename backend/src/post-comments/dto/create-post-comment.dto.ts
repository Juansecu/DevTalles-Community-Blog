import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostCommentDto {
  @ApiProperty({ description: 'Contenido del comentario' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'ID del autor del comentario' })
  @IsInt()
  authorId: number;

  @ApiProperty({ description: 'ID del post al que pertenece el comentario' })
  @IsInt()
  postId: number;

  @ApiPropertyOptional({
    description: 'ID del comentario padre, si es una respuesta'
  })
  @IsOptional()
  @IsInt()
  parentId?: number;
}
