import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostComment } from './entities/post-comment.entity';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private readonly commentRepo: Repository<PostComment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>
  ) {}

  async create(dto: CreatePostCommentDto): Promise<PostComment> {
    const author = await this.userRepo.findOne({
      where: { userId: dto.authorId }
    });
    if (!author) throw new NotFoundException('Usuario no encontrado');

    const post = await this.postRepo.findOne({
      where: { postId: dto.postId }
    });
    if (!post) throw new NotFoundException('Post no encontrado');

    let parent: PostComment | null = null;
    if (dto.parentId) {
      parent = await this.commentRepo.findOne({
        where: { postCommentId: dto.parentId }
      });
      if (!parent)
        throw new NotFoundException('Comentario padre no encontrado');
    }

    const comment = this.commentRepo.create({
      content: dto.content,
      author,
      post,
      parent: parent || undefined
    });

    return this.commentRepo.save(comment);
  }

  async findAll(): Promise<PostComment[]> {
    return this.commentRepo.find({
      relations: ['author', 'post', 'parent', 'children']
    });
  }

  async findOne(id: number): Promise<PostComment> {
    const comment = await this.commentRepo.findOne({
      where: { postCommentId: id },
      relations: ['author', 'post', 'parent', 'children']
    });
    if (!comment) throw new NotFoundException('Comentario no encontrado');
    return comment;
  }

  async update(id: number, dto: UpdatePostCommentDto): Promise<PostComment> {
    const comment = await this.findOne(id);

    if (dto.content) comment.content = dto.content;

    if (dto.parentId !== undefined) {
      const parent = dto.parentId
        ? await this.commentRepo.findOne({
            where: { postCommentId: dto.parentId }
          })
        : null;
      if (dto.parentId && !parent)
        throw new NotFoundException('Comentario padre no encontrado');
      comment.parent = parent || undefined;
    }

    if (dto.authorId) {
      const author = await this.userRepo.findOne({
        where: { userId: dto.authorId }
      });
      if (!author) throw new NotFoundException('Usuario no encontrado');
      comment.author = author;
    }

    if (dto.postId) {
      const post = await this.postRepo.findOne({
        where: { postId: dto.postId }
      });
      if (!post) throw new NotFoundException('Post no encontrado');
      comment.post = post;
    }

    return this.commentRepo.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepo.remove(comment);
  }
}
