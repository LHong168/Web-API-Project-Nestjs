import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from './lib/config';
import { setupSwaggerDocument } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  // =================================
  // configureNestGlobals
  // =================================
  const config = app.select(ConfigModule).get(ConfigService, { strict: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      errorHttpStatusCode: 422
    })
  );

  // =================================
  // configureNestSwagger
  // =================================
  setupSwaggerDocument(app, config.env.NODE_ENV);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
