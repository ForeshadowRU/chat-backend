import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message';
import { ServerController } from 'src/controllers/server';
import { ServerService } from 'src/services/server';
import { Channel } from 'src/models/channel.entity';
import { Server } from 'src/models/server';
import { User } from 'src/models/user';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Channel, Server, User]),
    UserModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
