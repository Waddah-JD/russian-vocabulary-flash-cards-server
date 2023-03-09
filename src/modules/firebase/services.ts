import { ConfigService } from '@modules/config/services';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  constructor(private config: ConfigService) {
    admin.initializeApp({
      credential: cert({
        projectId: this.config.getConfig().firebase.projectId,
        clientEmail: this.config.getConfig().firebase.clientEmail,
        privateKey: this.config.getConfig().firebase.privateKey,
      }),
    });
  }

  getAuthInstance() {
    return getAuth();
  }
}
