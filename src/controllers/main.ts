import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from '../services/main';
import { AuthGuard } from '@nestjs/passport';

@Controller('/')
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(@Req() req): string {
    return 'Access granted ' + req.user.username;
  }
}
