import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('production'),
        PORT: Joi.number().default(3000),
        POSTGRES_DATABASE: Joi.string().required(),
        POSTGRES_HOST: Joi.string().default('localhost'),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        DISCORD_CLIENT_ID: Joi.string().required(),
        DISCORD_CLIENT_SECRET: Joi.string().required(),
        DISCORD_CALLBACK_URL: Joi.string().required(),
        SECURE_AUTHENTICATION_COKKIES: Joi.boolean().required(),
        JWT_SECRET: Joi.string().required()
      })
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST || 'localhost',
      migrations: ['./**/migrations/*{.ts,.js}'],
      migrationsRun: true,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
      type: 'postgres',
      username: process.env.POSTGRES_USER,
      synchronize: true
    }),
    UsersModule,
    AuthsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
