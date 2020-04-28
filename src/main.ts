import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './validation';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: exceptionFactory,
    }),
  );

  await app.listen(8080);
}
bootstrap();
