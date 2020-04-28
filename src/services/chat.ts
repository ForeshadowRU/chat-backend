import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user';
import { Channel } from 'src/models/channel';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private readonly messages: Repository<Message>,
    @InjectRepository(Message) private readonly channels: Repository<Channel>,
  ) {}

  async sendMessage(
    message: string,
    sender: User,
    channelId: number,
  ): Promise<Message> {
    const msg = new Message({
      sender: sender,
      channel: await this.channels.findOne({ id: channelId }),
      text: message,
    });
    return this.messages.save(msg);
  }
}
