import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat';
import { Message } from 'src/models/message';
import { Chat } from 'src/models/chat';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'shadowchat',
      entities: [Message, Chat],
      synchronize: true,
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
