import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from 'src/services/chat';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';

@Controller('/')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('channels')
  createChannel(@Body() body: { name: string }): Promise<Channel> {
    if (this.chatService.isChannelExists(body.name))
      throw new UnprocessableEntityException(
        'Chat with same name already exists',
      );
    return this.chatService.createChannel(body.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('channels/:id')
  getMessagesFromChannel(@Param('id') id: number): Promise<Array<Message>> {
    return this.chatService.getMessagesFromChannel(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('channels')
  getChannels(): Promise<Array<Channel>> {
    return this.chatService.getChannels();
  }
}
