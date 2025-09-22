import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './entities/post-comment.entity';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment, User, Post])],
  controllers: [PostCommentsController],
  providers: [PostCommentsService]
})
export class PostCommentsModule {}
