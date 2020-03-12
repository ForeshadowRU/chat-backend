import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123',
  database: 'shadowchat',
  entities: [join(__dirname, '/../models/*.{ts,js}')],
  synchronize: false,
  charset: 'utf8mb4',
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
