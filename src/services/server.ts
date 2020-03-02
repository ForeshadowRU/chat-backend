import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from 'src/models/message';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { CreateServerRequest } from 'src/dto/requests/CreateServerRequest';
import { User } from 'src/models/user';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Message) private messages: Repository<Message>,
    @InjectRepository(Channel) private channels: Repository<Channel>,
    @InjectRepository(Server) private servers: Repository<Server>,
    @InjectRepository(User) private users: Repository<User>,
  ) {}

  getServerList() {
    return this.servers.find({ relations: ['members'] });
  }

  getServerInfo(id: string): Promise<Server> {
    return this.servers.findOne({ id });
  }

  getChannels(serverId: string): Promise<Array<Channel>> {
    return this.channels.find({ where: { server: serverId } });
  }
  async createNewServer(server: CreateServerRequest): Promise<any> {
    let members = new Array<User>();
    for await (let member of server.members) {
      members.push(await this.users.findOne({ id: member }));
    }
    let channel = new Channel();
    channel.name = 'General';
    channel.users = members;
    let newServer: Server = {
      ...server,
      channells: [channel],
      members: members,
    };
    return this.servers.save(newServer);
  }
}