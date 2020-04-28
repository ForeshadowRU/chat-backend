import { Module } from '@nestjs/common';

import { ChatGateway } from 'src/websockets/messages';
import { AuthModule } from './auth';
import { ChatService } from '../services/chat';
import { JwtModule } from '@nestjs/jwt';
import { JWT_GOOGLE_SECRET } from 'src/constants';
import { UserModule } from './user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message';
@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: JWT_GOOGLE_SECRET,
      signOptions: {
        algorithm: 'HS256',
        issuer: 'shadow-chat',
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
