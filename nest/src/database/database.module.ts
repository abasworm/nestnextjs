import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST') || 'localhost',
        port: parseInt(configService.get('DB_PORT')) || 3306,
        username: configService.get('DB_USER') || 'root',
        password: configService.get('DB_PASS') || 'secret',
        database: configService.get('DB_DATABASE') || 'nest_test',
        entities: [join('dist', '**', '*.entity.js')],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
