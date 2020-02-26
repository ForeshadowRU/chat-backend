import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UserService } from 'src/services/user';

@Controller('auth/')
export class SessionController {
  constructor(public userService: UserService) {}
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    this.userService.save(createUserDto);
    return 'This action adds a new user';
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect(`${process.env.FRONTEND_URL}/login/succes/${jwt}`);
    else res.redirect(`${process.env.FRONTEND_URL}/login/failure`);
  }
}
