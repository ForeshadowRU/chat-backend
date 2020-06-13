import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
  UnprocessableEntityException,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from 'src/services/chat';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import { CurrentUser } from 'src/decorators/currentUser';
import { User } from 'src/models/user';

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
  getMessagesFromChannel(
    @Param('id') id: number,
    @CurrentUser() user,
  ): Promise<Array<Message>> {
    console.log(user);
    return this.chatService.getMessagesFromChannel(id, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('channels')
  getChannels(): Promise<Array<Channel>> {
    return this.chatService.getChannels();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('messages/:id')
  deleteMessage(
    @CurrentUser() user: Partial<User>,
    @Param('id') id: number,
  ): Promise<Message[]> {
    return this.chatService.deleteMessage(user, id);
  }
}
