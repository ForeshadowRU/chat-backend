import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user';

import { GoogleOAuth2Client } from './google/GoogleOAuth2Client';
import { GoogleUserInfo } from './google/types';
import { LoginResponse } from 'src/dto/responses/LoginResponse';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly googleOAuth2Client: GoogleOAuth2Client,
  ) {}

  async login(code: string): Promise<LoginResponse> {
    if (!code) throw new UnprocessableEntityException('Неверный код Google');

    const { tokens } = await this.googleOAuth2Client.getToken(code);

    const userInfo: GoogleUserInfo = this.jwtService.decode(tokens.id_token, {
      json: true,
    });
    let user = new User();
    const isUserAlreadyExists = await this.userService.exists(userInfo.email);
    if (!isUserAlreadyExists) {
      user = await this.userService.save(
        new User({
          email: userInfo.email,
          avatar: userInfo.picture,
          firstname: userInfo.given_name,
          lastname: userInfo.family_name,
        }),
      );
    } else {
      user = await this.userService.find(userInfo.email);
    }
    return {
      accessToken: this.jwtService.sign(instanceToPlain(user), {
        algorithm: 'HS256',
        issuer: 'shadow-chat',
        expiresIn: '1h',
      }),
      expiresAt: new Date().getTime() + 60 * 60 * 1000,
      user: user,
    };
  }
}
