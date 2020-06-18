import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user';
import { LoginResponse } from 'src/dto/responses/LoginResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(googleToken: string): Promise<LoginResponse> {
    if (!googleToken) throw new BadRequestException('No token provided.');
    const decoded = this.jwtService.decode(googleToken);

    const data = {
      firstname: decoded['given_name'],
      lastname: decoded['family_name'],
      avatar: decoded['picture'],
      email: decoded['email'],
    };
    if (!(await this.userService.isUserExist(data.email))) {
      const user = new User();
      user.firstname = data['firstname'];
      user.lastname = data['lastname'];
      user.avatar = data['avatar'];
      user.email = data['email'];
      await this.userService.save(user);
    }

    return {
      auth_token: this.jwtService.sign(
        { email: data['email'] },
        { algorithm: 'HS256', issuer: 'shadow-chat', expiresIn: '1h' },
      ),
      user: await this.userService.find(data['email']),
    };
  }
}
