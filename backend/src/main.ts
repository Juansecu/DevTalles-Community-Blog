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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig
  );

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
