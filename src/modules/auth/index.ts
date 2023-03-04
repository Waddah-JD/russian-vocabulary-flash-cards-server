import { FirebaseModule } from '@modules/firebase';
import { Module } from '@nestjs/common';

import { AuthService } from './services';

@Module({
  imports: [FirebaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
