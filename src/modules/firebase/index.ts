import { ConfigModule } from '@modules/config';
import { Module } from '@nestjs/common';

import { FirebaseService } from './services';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
