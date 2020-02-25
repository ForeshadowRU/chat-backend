import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { SaveUserDto } from './types/saveUserDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async save(user: SaveUserDto): Promise<User> {
    return this.users.save(user);
  }

  async isUserExist(idOrUsername: string | number): Promise<Boolean> {
    if (typeof idOrUsername === 'string') {
      return !!this.users.findOne({ username: idOrUsername });
    }
    return !!this.users.findOne({ id: idOrUsername });
  }
}
