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
import { GoogleCodeExchangeDto } from 'src/dto/requests/GoogleCodeExchange.dto';
import { ApiTags } from '@nestjs/swagger';
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('/auth/')
export class AuthController {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public jwtService: JwtService,
  ) {}

  @Post('google')
  async login(@Body() code: GoogleCodeExchangeDto): Promise<LoginResponse> {
    return this.authService.login(code.code);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() payload): Promise<User> {
    const { email } = payload.user;
    return this.userService.find(email);
  }
}
