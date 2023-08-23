import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'secret',
  database: 'nest_test',
  entities: [join('dist', '**', '*.entity.js')],
  synchronize: true,
};
