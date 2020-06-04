import { Injectable, BadRequestException } from '@nestjs/common';
import { Message } from 'src/models/message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user';
import { Channel } from 'src/models/channel';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private readonly messages: Repository<Message>,
    @InjectRepository(Channel) private readonly channels: Repository<Channel>,
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

  async createChannel(name: string): Promise<Channel> {
    return this.channels.save(new Channel({ name, isPrivate: false }));
  }

  async getMessagesFromChannel(channelId: number): Promise<Array<Message>> {
    const channel = await this.channels.findOne({
      where: { id: channelId },
      relations: ['messages', 'messages.sender'],
      order: {
        created_at: 'ASC',
      },
    });
    if (!channel)
      throw new BadRequestException(`No channel with id = ${channelId}`);
    return channel.messages;
  }

  async isChannelExists(name: string | number): Promise<boolean> {
    const condition = typeof name === 'string' ? { name } : { id: name };
    return !!this.channels.find({ where: condition });
  }

  async getChannels(): Promise<Channel[]> {
    const channels = await this.channels.find();
    return channels;
  }
}
