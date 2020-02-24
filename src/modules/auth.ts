import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SessionController } from 'src/controllers/session';
import { LocalStrategy } from 'src/strategies/local';
import { JWT_SECRET } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SessionController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
