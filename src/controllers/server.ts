import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ServerService } from 'src/services/server';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { CreateServerRequest } from 'src/dto/requests/CreateServerRequest';
import { UserService } from 'src/services/user';

@Controller('/')
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly userService: UserService,
  ) {}
}
