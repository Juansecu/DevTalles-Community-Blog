import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { AuthUser } from '../auth/typings/auth-user';
import { PostLike } from './entities/post-like.entity';
import { PostWithLikesViewEntity } from './entities/post-with-likes.view-entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @InjectRepository(PostWithLikesViewEntity)
    private readonly postWithLikesViewRepository: Repository<PostWithLikesViewEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(dto: CreatePostDto): Promise<Post> {
    const author = await this.userRepository.findOne({
      where: { userId: dto.authorId }
    });
    if (!author) throw new NotFoundException('Autor no encontrado');

    const post = this.postRepository.create({
      title: dto.title,
      body: dto.body,
      bannerUrl: dto.bannerUrl,
      author
    });

    return this.postRepository.save(post);
  }

  async findAll(
    page = 1,
    limit = 10
  ): Promise<{ data: Post[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.postRepository.findAndCount({
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
      order: { postedAt: 'DESC' }
    });
    return { data, total, page, limit };
  }

  async findOne(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { postId: postId },
      relations: ['author']
    });
    if (!post) throw new NotFoundException('Post no encontrado');
    return post;
  }

  async update(postId: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(postId);
    Object.assign(post, dto);
    return this.postRepository.save(post);
  }

  async remove(postId: number): Promise<void> {
    const post = await this.findOne(postId);
    await this.postRepository.remove(post);
  }

  async updateLikesCount(postId: number, user: AuthUser): Promise<void> {
    const post: Post | null = await this.postRepository.findOne({
      select: ['postId'],
      where: { postId: postId }
    });

    if (!post) throw new NotFoundException('Post no encontrado');

    const existingLike: PostLike | null = await this.postLikeRepository.findOne(
      {
        where: { postId: postId, userId: user.userId }
      }
    );

    if (!existingLike) {
      const newLike = this.postLikeRepository.create({
        postId: postId,
        userId: user.userId
      });

      await this.postLikeRepository.save(newLike);

      return;
    }

    await this.postLikeRepository.remove(existingLike);
  }
}
