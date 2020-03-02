import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get('/:id/channels')
  getAllChannelsInProject(@Param() serverId: string): Promise<Array<Channel>> {
    return this.serverService.getChannels(serverId);
  }

  @Post()
  createNewServer(@Body() server: CreateServerRequest): Promise<Server> {
    return this.serverService.createNewServer(server);
  }
}
