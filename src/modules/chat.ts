import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message';
import { ChatController } from 'src/controllers/chat';
import { ChatService } from 'src/services/chat';
import { Chat } from 'src/models/chat';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
