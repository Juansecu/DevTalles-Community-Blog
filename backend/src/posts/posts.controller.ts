// posts.controller.ts
import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse, ApiUnauthorizedResponse, ApiForbiddenResponse
} from '@nestjs/swagger';
import { Post as PostEntity } from './entities/post.entity';
import type { RequestWithUser } from '../auth/typings/request-with-user';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from '../auth/guards/access.guard';
import { Access } from '../auth/decorators/access.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Crear un nuevo post' })
  @ApiResponse({ status: 201, description: 'Post creado', type: PostEntity })
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar posts con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.postsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un post por id' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un post por id' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un post por id' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }

  @Put(':postId/like')
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @ApiNotFoundResponse({ description: 'Not Found - Post not found' })
  @ApiOkResponse({ description: 'OK - Post liked successfully' })
  @ApiOperation({ summary: 'Like a post' })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'ID of the post to like'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing token'
  })
  @UseGuards(AuthGuard('jwt'), AccessGuard)
  @Access([], ['LIKE_POSTS'])
  likePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() request: RequestWithUser
  ) {
    return this.postsService.updateLikesCount(postId, request.user);
  }
}
