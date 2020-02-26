import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { CreateUserRequest } from 'src/dto/requests/CreateUserRequest';
import { hash } from 'bcrypt';
import { JWT_GEN_SALT_ROUNDS } from 'src/constants';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async save(user: CreateUserRequest): Promise<User> {
    if (await this.isUserExist(user))
      throw new BadRequestException('Username already taken');
    user.password = await hash(user.password, JWT_GEN_SALT_ROUNDS);
    return this.users.save(user);
  }

  async isUserExist(user: {
    username: string;
    email: string;
  }): Promise<Boolean> {
    return !!(await this.users.findOne({
      where: [{ username: user.username }, { email: user.email }],
    }));
  }
}
