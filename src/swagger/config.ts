import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Shadow Chat API')
  .setDescription('Описание доступных HTTP методов')
  .setVersion('1.0')
  .build();
