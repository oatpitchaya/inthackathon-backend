import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as fs from 'fs';

@Injectable()
export class FirebaseConfig {
  private app: admin.app.App;

  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      const credentialPath =
        this.configService.get<string>('FIREBASE_CREDENTIALS_PATH') ||
        'config/inthackathon-firebase-adminsdk-fbsvc-bb93a52e4a.json';

      this.app = admin.initializeApp({
        credential: admin.credential.cert(credentialPath),
      });
    } else {
      this.app = admin.app();
    }
  }

  getAuth() {
    return this.app.auth();
  }
}
