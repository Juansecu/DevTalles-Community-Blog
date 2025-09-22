import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Res,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { RolesService } from './services/roles.service';
import { setAuthCookie } from '../utils/cookie.util';
import type { Response } from 'express';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthUser } from './typings/auth-user';

export interface RequestWithUser extends Request {
  user: AuthUser;
}

@ApiTags('Auth') // ✅ Agrupa todos los endpoints en Swagger bajo "Auth"
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService
  ) {}

  // 🔹 LOGIN
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con email y password' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso, devuelve usuario y token'
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: CreateAuthDto, @Res() res: Response) {
    const { user, token } = await this.authService.validateUser(
      dto.email,
      dto.password
    );
    setAuthCookie(res, token);
    return res.json({ user, token });
  }

  // 🔹 Discord Login
  @Get('discord')
  @ApiOperation({ summary: 'Redirección a login con Discord' })
  @UseGuards(AuthGuard('discord'))
  discordLogin() {}

  // 🔹 Discord Callback
  @Get('discord/callback')
  @ApiOperation({ summary: 'Callback de Discord' })
  @ApiResponse({ status: 200, description: 'Usuario validado vía Discord' })
  @UseGuards(AuthGuard('discord'))
  discordCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    const profile = req.user;
    const { user, token } = this.authService.validateDiscordUser(profile);
    return res.json({ user, token });
  }

  // ===========================
  // 🔹 PERMISSIONS CRUD
  // ===========================
  @Post('permissions')
  @ApiOperation({ summary: 'Crear un nuevo permiso' })
  @ApiBody({ type: CreatePermissionDto })
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get('permissions')
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  findAllPermission() {
    return this.permissionsService.findAll();
  }

  @Get('permissions/:id')
  @ApiOperation({ summary: 'Obtener un permiso por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOnPermissione(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch('permissions/:id')
  @ApiOperation({ summary: 'Actualizar un permiso por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePermissionDto })
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete('permissions/:id')
  @ApiOperation({ summary: 'Eliminar un permiso por ID' })
  @ApiParam({ name: 'id', type: Number })
  removePermission(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }

  // ===========================
  // 🔹 ROLES CRUD
  // ===========================
  @Post('roles')
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiBody({ type: CreateRoleDto })
  createRoles(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('roles')
  @ApiOperation({ summary: 'Obtener todos los roles' })
  findAllRoles() {
    return this.rolesService.findAll();
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOneRoles(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: 'Actualizar un rol por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRoleDto })
  updateRoles(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: 'Eliminar un rol por ID' })
  @ApiParam({ name: 'id', type: Number })
  removeRoles(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
