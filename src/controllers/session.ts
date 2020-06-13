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
import { UserService } from 'src/services/user';
import { AuthService } from 'src/services/auth';
import { User } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/dto/responses/LoginResponse';
import { AuthGuard } from '@nestjs/passport';
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class SessionController {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public jwtService: JwtService,
  ) {}

  @Get('/google')
  async googleLogin(@Req() req): Promise<LoginResponse> {
    const token = req.headers['authorization'];
    let result = await this.authService.login(token);
    return result;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  me(@Req() payload): Promise<User> {
    const { email } = payload.user;
    return this.userService.find(email);
  }
}
