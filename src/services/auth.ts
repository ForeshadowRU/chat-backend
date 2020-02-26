import { Injectable, UnauthorizedException, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { LoginRequest } from 'src/dto/requests/LoginRequest';
import { LoginResponse } from 'src/dto/responses/LoginResponse';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.users.findOne({ username: login });
    if (!user) throw new UnauthorizedException('Wrong username/password');
    let equals = await compare(pass, user.password);

    if (equals) {
      return user;
    }

    throw new UnauthorizedException('Wrong username/password');
  }
  async login(user: LoginRequest): Promise<LoginResponse> {
    const payload = { username: user.username };
    return {
      auth_token: this.jwtService.sign(payload),
    };
  }
  async me(username: string) {
    return this.users.findOne({ username: username });
  }
}
