import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostCommentDto {
  @ApiPropertyOptional({ description: 'Contenido actualizado del comentario' })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @ApiPropertyOptional({
    description: 'ID del autor (opcional para reasignar)'
  })
  @IsOptional()
  @IsInt()
  authorId?: number;

  @ApiPropertyOptional({ description: 'ID del post (opcional)' })
  @IsOptional()
  @IsInt()
  postId?: number;

  @ApiPropertyOptional({ description: 'ID del comentario padre (opcional)' })
  @IsOptional()
  @IsInt()
  parentId?: number;
}
