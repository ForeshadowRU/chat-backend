import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SessionController } from 'src/controllers/session';
import { JwtStrategy } from 'src/strategies/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { UserModule } from './user';
import { ConfigModule } from '@nestjs/config';
import { JWT_GOOGLE_SECRET } from 'src/constants';
import { ChatGateway } from 'src/websockets/messages';
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_GOOGLE_SECRET,
      signOptions: {
        algorithm: 'HS256',
        issuer: 'shadow-chat',
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SessionController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
