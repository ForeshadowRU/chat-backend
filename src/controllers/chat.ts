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
import { UserService } from 'src/services/user';
import { ChatGateway } from 'src/websockets/messages';

@Controller('/')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userSerivce: UserService,
    private readonly chatGate: ChatGateway,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('channels')
  async createChannel(@Body() body: { name: string }): Promise<Channel[]> {
    if (await this.chatService.isChannelExists(body.name))
      throw new UnprocessableEntityException(
        'Chat with same name already exists',
      );
    await this.chatService.createChannel(body.name);
    return this.chatService.getChannels();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('channels/:id')
  getMessagesFromChannel(
    @Param('id') id: number,
    @CurrentUser() user,
  ): Promise<Array<Message>> {
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/members')
  async getMembers() {
    return await (await this.userSerivce.findAll()).map(member => ({
      ...member,
      online: this.chatGate.users.map(usr => usr.id).includes(member.id),
    }));
  }
}
