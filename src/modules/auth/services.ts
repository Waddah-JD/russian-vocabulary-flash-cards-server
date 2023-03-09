import { FirebaseService } from '@modules/firebase/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private firebase: FirebaseService) {}

  async decodeAuthToken(accessToken: string) {
    return await this.firebase.getAuthInstance().verifyIdToken(accessToken);
  }
}
