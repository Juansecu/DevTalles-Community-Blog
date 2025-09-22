import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { IdGeneratorUtil } from '../../utils/id-generator.util';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 🔎 Validar email o username existentes
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username }
      ]
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
      if (existingUser.username === createUserDto.username) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
    }

    // 🔒 Hashear contraseña
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    // 🆕 Crear usuario
    const user: User = this.usersRepository.create({
      ...createUserDto,
      userId: IdGeneratorUtil.generateNumericalId(),
      password: hashedPassword
    });

    return this.usersRepository.save(user);
  }

  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const isCurrentPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    if (dto.newPassword !== dto.newPasswordConfirmation) {
      throw new BadRequestException(
        'La nueva contraseña y su confirmación no coinciden'
      );
    }

    const saltRounds = 10;

    user.password = await bcrypt.hash(dto.newPassword, saltRounds);

    await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    await this.usersRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
