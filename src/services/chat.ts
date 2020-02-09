import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from 'src/models/message';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ transports: ['websocket'] })
export class ChatService {
  constructor(
    @InjectRepository(Message) public messages: Repository<Message>,
  ) {}

  @SubscribeMessage('events')
  async handleEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): Promise<WsResponse<unknown>> {
    console.log('че то произошло', data);
    const event = 'events';
    data = await this.sendMessage(data);
    client.broadcast.emit(event, data);

    return { event, data };
  }

  sendMessage(message: Message) {
    return this.messages.save(message);
  }
  getMessages() {
    return this.messages.find();
  }
}
