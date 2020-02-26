import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async save(user: CreateUserDto): Promise<User> {
    return this.users.save(user);
  }

  async isUserExist(username: string): Promise<Boolean> {
    return !!this.users.findOne({ username: username });
  }
}
