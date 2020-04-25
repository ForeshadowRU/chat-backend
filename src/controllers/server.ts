import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ServerService } from 'src/services/server';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { CreateServerRequest } from 'src/dto/requests/CreateServerRequest';
import { UserService } from 'src/services/user';

@Controller('/servers')
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly userService: UserService,
  ) {}

  @Get('/channels')
  getChannels(
    @Query('private') isPrivate: boolean | undefined,
  ): Promise<Array<Channel>> {
    return this.serverService.getChannels(isPrivate);
  }

  @Get('/:id/messages')
  getMessages(@Param() channelId) {
    return this.serverService.getMessages(channelId);
  }
}
