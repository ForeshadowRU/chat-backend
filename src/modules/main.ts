import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { User } from 'src/models/user';
import { AuthModule } from './auth';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'shadowchat',
      entities: [Message, Channel, Server, User],
      synchronize: true,
    }),
    ChatModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
