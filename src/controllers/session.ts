import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  Header,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user';
import { AuthService } from 'src/services/auth';
import { User } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/dto/responses/LoginResponse';
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class SessionController {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public jwtService: JwtService,
  ) {}

  @Get('/google')
  googleLogin(@Req() req): Promise<LoginResponse> {
    const token = req.headers['authorization'];
    return this.authService.login(token);
  }
}
