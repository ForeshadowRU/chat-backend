import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
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
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async deleteMessage(user: Partial<User>, id: number): Promise<Message[]> {
    const messageSender = await this.messages.findOne({
      where: { id },
      relations: ['sender', 'channel'],
    });
    if (!messageSender)
      throw new NotFoundException('No message with this id is exists');
    if (user.id !== messageSender.sender.id)
      throw new ForbiddenException("You can't remove other's users messages");
    await this.messages.delete({ id: id });
    return await (
      await this.channels.findOne({
        where: { id: messageSender.channel.id },
        relations: ['messages', 'messages.sender'],
      })
    ).messages.map(message => ({
      ...message,
      editable: user.id === message.sender.id,
    }));
  }
  async sendMessage(
    message: string,
    sender: User,
    channelId: number,
  ): Promise<Message> {
    const msg = new Message({
      sender: sender,
      channel: await this.channels.findOne({where: { id: channelId }}),
      text: message,
    });
    return this.messages.save(msg);
  }

  async createChannel(name: string): Promise<Channel> {
    return this.channels.save(new Channel({ name, isPrivate: false }));
  }

  async getMessagesFromChannel(
    channelId: number,
    user?: User,
  ): Promise<Array<Message>> {
    const channel = await this.channels.findOne({
      where: { id: channelId },
      relations: ['messages', 'messages.sender'],
      order: {
        created_at: 'DESC',
      },
    });

    if (!channel)
      throw new BadRequestException(`No channel with id = ${channelId}`);
    this.users.save({ ...user, last_channel: channelId });
    return channel.messages.map(message => ({
      ...message,
      editable: user.id === message.sender.id,
    }));
  }

  async isChannelExists(name: string): Promise<boolean> {
    return !!(await this.channels.findOne({ where: { name } }));
  }

  async getChannels(): Promise<Channel[]> {
    const channels = await this.channels.find();
    return channels;
  }
}
