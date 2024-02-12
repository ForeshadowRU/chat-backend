import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { AppController } from 'src/controllers/main';
import { ChatModule } from './chat';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export function DatabaseOrmModule(): DynamicModule {
  // we could load the configuration from dotEnv here,
  // but typeORM cli would not be able to find the configuration file.

  const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

  const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [join(__dirname, '/../models/*.{ts,js}')],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    logger: 'file',
    migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  };

  return TypeOrmModule.forRoot(config);
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseOrmModule(),
    UserModule,
    ServerModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
