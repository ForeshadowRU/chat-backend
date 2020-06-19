import { Controller, Get, UseGuards, Req, Inject } from '@nestjs/common';
import { ChatGateway } from 'src/websockets/messages';
import { AuthGuard } from '@nestjs/passport';

@Controller('/')
export class AppController {
  constructor(private readonly ChatGate: ChatGateway) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return `Members online - ${this.ChatGate.getUsersCount()}`;
  }
}
