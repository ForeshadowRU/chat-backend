import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
    const config: DataSourceOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: [join(__dirname, '/../models/*.{ts,js}')],
      synchronize: true,
      migrationsRun: false,
      logging: true,
      logger: 'file',
      migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
    };
    console.log(config);

    return config;
  },
};
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
// TypeORM Connection Config
export const typeOrmConfig: TypeOrmModuleOptions = {
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
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
