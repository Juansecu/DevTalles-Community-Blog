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
  Req
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import type { RequestWithUser } from '../auth/typings/request-with-user';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada', type: Category })
  async create(
    @Body() dto: CreateCategoryDto,
    @Req() request: RequestWithUser
  ): Promise<Category> {
    return await this.categoriesService.create(dto, request.user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorías con paginación' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de registros por página'
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de categorías',
    type: [Category]
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.categoriesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por id' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: Category
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la categoría a actualizar'
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada',
    type: Category
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la categoría a eliminar'
  })
  @ApiResponse({ status: 200, description: 'Categoría eliminada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
