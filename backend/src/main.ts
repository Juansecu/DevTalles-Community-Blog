// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const {
  description,
  license,
  name,
  repository,
  version
  // eslint-disable-next-line @typescript-eslint/no-require-imports
} = require('../package.json');

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = process.env.CORS_ALLOWED_ORIGINS?.split(',');

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin) return callback(null, true);

      if (whitelist?.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true
  });

  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(name as string)
    .setDescription(description as string)
    .setVersion(version as string)
    .setLicense(
      license as string,
      `${(repository as { url: string }).url
        .replace(/^(git\+)/, '')
        .replace(/(\.git)$/, '')}/blob/main/LICENSE`
    )
    .addBearerAuth({
      description: 'Autenticación mediante JWT (JSON Web Token)',
      type: 'http'
    })
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
