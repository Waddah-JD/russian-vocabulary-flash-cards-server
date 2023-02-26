import { ConfigModule } from '@modules/config';
import { ConfigService } from '@modules/config/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dateStoreFactory from './dataStore';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dateStoreFactory,
    }),
  ],
})
export class DatabaseModule {}
