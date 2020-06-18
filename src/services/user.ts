import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { JWT_GEN_SALT_ROUNDS } from 'src/constants';
import { Message } from 'src/models/message';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async find(email: string) {
    return this.users.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.users.save(user);
  }

  async isUserExist(email: string): Promise<Boolean> {
    return !!(await this.users.findOne({
      where: { email },
    }));
  }
}
