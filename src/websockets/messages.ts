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
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userServce: UserService,
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
  async onChat(client: Client, message) {
    return { message: 'ok' };
  }
}
