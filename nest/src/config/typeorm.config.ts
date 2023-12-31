import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'secret',
    database: process.env.DB_DATABASE || 'nest_test',
    entities: [join('dist', '**', '*.entity.js')],
    synchronize: true,
  }),
);
