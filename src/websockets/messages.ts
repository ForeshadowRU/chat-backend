import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user';
import { User } from 'src/models/user';
import { ChatService } from 'src/services/chat';
import { Injectable } from '@nestjs/common';
@Injectable()
@WebSocketGateway(3900, { transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}
  @WebSocketServer() server: Server;
  users: Array<User> = [];

  getUsersCount() {
    return 5
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;
    let user: User = null;
    if (!token) client.disconnect(true);
    try {
      const result = await this.jwtService.decode(token);
      user = await this.userService.find(result['email']);
    } catch (e) {
      client.disconnect(true);
    }
    this.users.push(user);

    this.server.emit('users', this.users);
  }

  async handleDisconnect(client: Socket) {
    const token: string = client.handshake.query.token as string;
    let user: User = null;
    if (!token) client.disconnect(true);
    try {
      const result = await this.jwtService.decode(token);
      user = await this.userService.find(result['email']);
    } catch (e) {
      client.disconnect(true);
    }
    this.users = this.users.filter(us => user.id === us.id);
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  async onChat(client: Socket, message) {
    const user: User = await this.userService.find(
      this.jwtService.decode(client.handshake.query.token as string)['email'],
    );
    try {
      const msg = await this.chatService.sendMessage(
        message.text,
        user,
        message.channelId,
      );
      client.broadcast.emit('message', msg);
      client.emit('message', msg);
      return msg;
    } catch (e) {
      console.warn(e.message);
    }
  }
}
