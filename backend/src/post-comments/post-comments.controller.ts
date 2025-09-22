import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PostComment } from './entities/post-comment.entity';

@ApiTags('PostComments')
@Controller('post-comments')
export class PostCommentsController {
  constructor(private readonly service: PostCommentsService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({
    status: 201,
    description: 'Comentario creado',
    type: PostComment
  })
  create(@Body() dto: CreatePostCommentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({
    status: 200,
    description: 'Listado de comentarios',
    type: [PostComment]
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Comentario encontrado',
    type: PostComment
  })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un comentario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Comentario actualizado',
    type: PostComment
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostCommentDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un comentario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Comentario eliminado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
