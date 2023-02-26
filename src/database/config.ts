import { getEnvFileExtension } from '@modules/config/utils';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config({ path: `.env.${getEnvFileExtension(process.env.NODE_ENV)}` });

const typeOrmConnectionDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', 'modules', '**', 'entities.ts')],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'migrations', '**/*')],
  migrationsRun: false,
  synchronize: false,
});

export default (() => typeOrmConnectionDataSource)();
