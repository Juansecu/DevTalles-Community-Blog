import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationSchema: Joi.object({
        CLOUDFLARE_R2_ACCESS_KEY_ID: Joi.string().required(),
        CLOUDFLARE_R2_BUCKET: Joi.string().required(),
        CLOUDFLARE_R2_BUCKET_HINT: Joi.string().optional().default('auto'),
        CLOUDFLARE_R2_ENDPOINT: Joi.string().uri().required(),
        CLOUDFLARE_R2_PUBLIC_DOMAIN: Joi.string().uri().required(),
        CLOUDFLARE_R2_SECRET_ACCESS_KEY: Joi.string().required(),
        CORS_ALLOWED_ORIGINS: Joi.string().required(),
        DISCORD_CALLBACK_URL: Joi.string().required(),
        DISCORD_CLIENT_ID: Joi.string().required(),
        DISCORD_CLIENT_SECRET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().valid('production'),
        PORT: Joi.number().default(3000),
        POSTGRES_DATABASE: Joi.string().required(),
        POSTGRES_HOST: Joi.string().default('localhost'),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        SECURE_AUTHENTICATION_COOKIES: Joi.boolean().required()
      })
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST || 'localhost',
      migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
      migrationsRun: true,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
      type: 'postgres',
      username: process.env.POSTGRES_USER
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    PostCommentsModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
