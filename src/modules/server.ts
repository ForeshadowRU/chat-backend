import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message';
import { ServerController } from 'src/controllers/server';
import { ServerService } from 'src/services/server';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { User } from 'src/models/user';
import { UserModule } from './user';
import { ChatGateway } from 'src/websockets/messages';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Channel, Server, User]),
    UserModule,
  ],
  controllers: [ServerController],
  providers: [ServerService, ChatGateway],
})
export class ServerModule {}
