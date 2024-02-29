import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/session';
import { JwtStrategy } from 'src/strategies/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { UserModule } from './user';
import { JWT_GOOGLE_SECRET } from 'src/constants';
import { GoogleOAuth2Client } from 'src/services/google/GoogleOAuth2Client';
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleOAuth2Client],
})
export class AuthModule {}
