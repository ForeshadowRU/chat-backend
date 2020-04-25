import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from 'src/models/message';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/models/channel';
import { User } from 'src/models/user';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Message) private messages: Repository<Message>,
    @InjectRepository(Channel) private channels: Repository<Channel>,
    @InjectRepository(User) private users: Repository<User>,
  ) {}

  getChannels(isPrivate: boolean): Promise<Array<Channel>> {
    return this.channels.find({ where: { isPrivate } });
  }
  async getMessages(channedId): Promise<Array<Message>> {
    return (await this.channels.find({ where: { id: channedId } }))[0].messages;
  }
}
