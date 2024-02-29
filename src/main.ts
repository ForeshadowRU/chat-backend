import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { UnproccessableEntityExepctionPipe } from './validation';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, methods: '*', allowedHeaders: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: UnproccessableEntityExepctionPipe,
    }),
  );
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(8080);
}
bootstrap();
