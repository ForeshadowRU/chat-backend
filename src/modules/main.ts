import { Module, DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import { Server } from 'src/models/server';
import { User } from 'src/models/user';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { AppController } from 'src/controllers/main';
import * as ormconfig from 'src/database/ormconfig';
export function DatabaseOrmModule(): DynamicModule {
  // we could load the configuration from dotEnv here,
  // but typeORM cli would not be able to find the configuration file.

  return TypeOrmModule.forRoot(ormconfig);
}
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot(),
    UserModule,
    ServerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
