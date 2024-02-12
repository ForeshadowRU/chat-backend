import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { AppController } from 'src/controllers/main';
import { ChatModule } from './chat';
import { typeOrmAsyncConfig } from 'src/database/db.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    ServerModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
