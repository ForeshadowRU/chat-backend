import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from 'src/models/message';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/models/channel';
import { User } from 'src/models/user';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Channel) private channels: Repository<Channel>,
    @InjectRepository(User) private users: Repository<User>,
  ) {}

  getChannels(isPrivate: boolean = false): Promise<Array<Channel>> {
    return this.channels.find({ where: { isPrivate } });
  }

  async createChannel(): Promise<void> {
    const chan: Channel = new Channel();
    chan.name = 'Test Channel';
    chan.isPrivate = false;

    this.channels.save(chan);
  }

  async getMessages(channelId: number): Promise<Array<Message>> {
    if ((await this.channels.find({ where: { id: channelId } })).length)
      return (await this.channels.find({ where: { id: channelId } }))[0]
        .messages;
    throw new BadRequestException(`No channel with id ${channelId}`);
  }
}
