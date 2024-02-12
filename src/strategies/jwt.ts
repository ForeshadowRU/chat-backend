import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET, JWT_GOOGLE_SECRET } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectRepository(User) private users: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_GOOGLE_SECRET,
    });
  }

  async validate(payload: any) {
    let result: Partial<User> = await this.users.findOne({
      where: {
          email: payload.email,
      }
    });
    if (!result) result = { email: payload.email };
    return result;
  }
}
