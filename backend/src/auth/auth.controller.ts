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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: CreateAuthDto, @Res() res: Response) {
    const { user, token } = await this.authService.validateUser(
      dto.email,
      dto.password
    );

    setAuthCookie(res, token);
    return res.json({ user, token });
  }

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  discordLogin() {
    // Este endpoint solo redirige a Discord
  }

  // 🔹 Callback de Discord
  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  discordCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    const profile = req.user; // ✅ ahora TypeScript sabe que existe y es AuthUser
    const { user, token } = this.authService.validateDiscordUser(profile);

    // Opcional: enviar cookie
    // setAuthCookie(res, token);

    return res.json({ user, token });
  }

  @Post('permissions/')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get('permissions/')
  findAllPermission() {
    return this.permissionsService.findAll();
  }

  @Get('permissions/:id')
  findOnPermissione(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch('permissions/:id')
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete('permissions/:id')
  removePermission(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }

  @Post('roles/')
  createRoles(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('roles/')
  findAllRoles() {
    return this.rolesService.findAll();
  }

  @Get('roles/:id')
  findOneRoles(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch('roles/:id')
  updateRoles(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete('roles/:id')
  removeRoles(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
