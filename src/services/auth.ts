import { Injectable, UnauthorizedException, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { JWT_GEN_SALT_ROUNDS } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.users.findOne({ username: login });
    if (!user) throw new UnauthorizedException('Wrong username/password');
    let passwordHash = await hash(pass, JWT_GEN_SALT_ROUNDS);
    let equals = await compare(passwordHash, user.password);

    if (equals) {
      return user;
    }

    throw new UnauthorizedException('Wrong username/password');
  }
  async login(user: any) {
    if (!user)
      throw new UnauthorizedException(HttpCode(401), 'Bad credentials');
    const payload = { id: user.user.id, login: user.user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async me(username: string) {
    return this.users.findOne({ username: username });
  }
}
