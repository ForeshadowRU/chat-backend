import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserRequest } from 'src/dto/requests/CreateUserRequest';
import { UserService } from 'src/services/user';
import { AuthService } from 'src/services/auth';
import { LoginRequest } from 'src/dto/requests/LoginRequest';
import { LoginResponse } from 'src/dto/responses/LoginResponse';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class SessionController {
  constructor(
    public userService: UserService,
    public authService: AuthService,
  ) {}
  @Post('/register')
  async register(@Body() createUserDto: CreateUserRequest): Promise<any> {
    const user = (await this.userService.save(createUserDto)).toPlain();
    const token = await this.authService.login(user);
    return { ...user, auth_token: token.auth_token };
  }
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginDto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect(`${process.env.FRONTEND_URL}/login/succes/${jwt}`);
    else res.redirect(`${process.env.FRONTEND_URL}/login/failure`);
  }
}
