import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Access } from '../auth/decorators/access.decorator';
import { AccessGuard } from '../auth/guards/access.guard';
import { number } from 'joi';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users') // Grupo en Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  //@UseGuards(AuthGuard('jwt'), AccessGuard)
  //@Access(['admin'], ['user.read'])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.'
  })
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }

  @Patch(':id/change-password')
  @ApiOperation({
    summary: 'Cambiar la contraseña de un usuario',
    description:
      'Permite cambiar únicamente la contraseña de un usuario existente.'
  })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de validación incorrectos' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto
  ): Promise<{ message: string }> {
    await this.usersService.changePassword(+id, dto);
    return { message: 'Contraseña actualizada correctamente' };
  }
}
