import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * For more info about config:
 * @link https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
 */
const swaggerOptions = {
  defaultModelExpandDepth: 3,
  defaultModelsExpandDepth: -1,
  docExpansion: 'none',
  filter: true,
  tagsSorter: 'alpha',
};

export function setupSwaggerDocument(
  app: NestExpressApplication,
  env: string,
): void {
  if (env === 'development') {
    const options = new DocumentBuilder()
      .setTitle('User Management API')
      .setDescription('The API that will handle CRUD from user base on role')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const clientDocument = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs', app, clientDocument, { swaggerOptions });
  }
}
