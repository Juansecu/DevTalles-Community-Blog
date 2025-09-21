import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { IdGeneratorUtil } from '../../utils/id-generator.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );
    const user: User = this.usersRepository.create({
      ...createUserDto,
      userId: IdGeneratorUtil.generateNumericalId(),
      password: hashedPassword
    });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userId } });
<<<<<<< HEAD:backend/src/users/users.service.ts
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
=======
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
>>>>>>> feature_blog_api:backend/src/users/services/users.service.ts
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

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
