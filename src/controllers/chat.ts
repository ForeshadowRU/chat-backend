import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from 'src/services/chat';
import { Message } from 'src/models/message';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getAll(): Promise<Array<Message>> {
    return this.chatService.getMessages();
  }
  @Post()
  async write(@Body() message: Message): Promise<void> {
    this.chatService.sendMessage(message);
  }
}
