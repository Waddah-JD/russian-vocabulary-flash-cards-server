import { ConfigModule } from '@modules/config';
import { ConfigService } from '@modules/config/service';
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
