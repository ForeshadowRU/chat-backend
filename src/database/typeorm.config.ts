import { DataSource } from 'typeorm';
import { join } from 'path';
require('dotenv').config();
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
export = new DataSource({
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
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
});
