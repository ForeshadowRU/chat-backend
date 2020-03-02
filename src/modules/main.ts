import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { User } from 'src/models/user';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { AppController } from 'src/controllers/main';

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
      charset: 'utf8mb4',
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UserModule,
    ServerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
