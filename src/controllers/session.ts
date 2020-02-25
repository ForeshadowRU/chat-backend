import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/')
export class SessionController {
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
