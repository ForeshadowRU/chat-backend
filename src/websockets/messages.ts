import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Client } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user';
import { User } from 'src/models/user';
import { ChatService } from 'src/services/chat';
@WebSocketGateway(3900, { transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}
  @WebSocketServer() server: SocketIO.Server;
  users: number = 0;

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token;
    if (!token) client.disconnect(true);
    try {
      this.jwtService.decode(token);
    } catch (e) {
      client.disconnect(true);
    }
    this.users++;

    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;

    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  async onChat(client: Socket, message) {
    console.log('DA');
    const user: User = await this.userService.find(
      this.jwtService.decode(client.handshake.query.token)['email'],
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
      console.log(e.message);
    }
  }
}
