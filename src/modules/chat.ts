import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message';
import { ChatController } from 'src/controllers/chat';
import { ChatService } from 'src/services/chat';
import { Channel } from 'src/models/channel';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
