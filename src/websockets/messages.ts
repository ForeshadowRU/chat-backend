import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: SocketIO.Server;
  users: number = 0;

  async handleConnection() {
    this.users++;

    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;

    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  async onChat(client, message) {
    console.log(message);
    return { message: 'ok' };
  }
}
