import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async find(email: string) {
    return this.users.findOne({ where: { email } });
  }
  async findAll() {
    return await this.users.find();
  }
  async save(user: User): Promise<User> {
    return this.users.save(user);
  }

  async exists(email: string): Promise<Boolean> {
    return await this.users.exists({
      where: { email },
    });
  }
}
