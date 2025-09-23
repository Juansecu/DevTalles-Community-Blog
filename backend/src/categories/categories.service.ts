import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthUser } from '../auth/typings/auth-user';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(dto: CreateCategoryDto, user: AuthUser): Promise<Category> {
    const author: User | null = await this.userRepository.findOne({
      where: { userId: user?.userId }
    });

    if (!author) throw new NotFoundException('Usuario no encontrado');

    const category = this.categoryRepository.create({
      name: dto.name,
      addedBy: author
    });

    return this.categoryRepository.save(category);
  }

  async findAll(
    page = 1,
    limit = 10
  ): Promise<{ data: Category[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.categoryRepository.findAndCount({
      relations: ['addedBy'],
      skip: (page - 1) * limit,
      take: limit,
      order: { addedAt: 'DESC' }
    });
    return { data, total, page, limit };
  }

  async findOne(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: categoryId },
      relations: ['addedBy']
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return category;
  }

  async update(categoryId: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(categoryId);
    Object.assign(category, dto);
    if (dto.addedById) {
      const user = await this.userRepository.findOne({
        where: { userId: dto.addedById }
      });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      category.addedBy = user;
    }
    return this.categoryRepository.save(category);
  }

  async remove(categoryId: number): Promise<void> {
    const category = await this.findOne(categoryId);
    await this.categoryRepository.remove(category);
  }
}
