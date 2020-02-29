import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main';
import 'reflect-metadata';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { exceptionFactory } from './validation';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: exceptionFactory,
    }),
  );
  await app.listen(8080);
}
bootstrap();
