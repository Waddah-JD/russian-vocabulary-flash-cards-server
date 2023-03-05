import { AuthModule } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { WordsModule } from '@modules/words';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersWordsController } from './controllers';
import { UsersWords } from './entities';
import { UsersWordsService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersWords]),
    AuthModule,
    UsersModule,
    WordsModule,
  ],
  controllers: [UsersWordsController],
  providers: [UsersWordsService],
  exports: [UsersWordsService],
})
export class UsersWordsModule {}
