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
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: join(__dirname, '/migrations/'),
  },
};

export = config;
