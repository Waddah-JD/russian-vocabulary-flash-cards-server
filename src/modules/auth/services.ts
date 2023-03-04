import { FirebaseService } from '@modules/firebase/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly firebase: FirebaseService) {}

  async decodeAuthToken(accessToken: string) {
    return await this.firebase.getAuthInstance().verifyIdToken(accessToken);
  }
}
