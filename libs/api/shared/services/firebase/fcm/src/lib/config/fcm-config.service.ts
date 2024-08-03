import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EnvService } from '@shtifh/env-service';

@Injectable()
export class FCMConfigService {
  private logger = new Logger(FCMConfigService.name);
  firebase;
  constructor(private readonly envService: EnvService) {
    const firebaseConfig = {
      type: this.envService.get('FIREBASE_TYPE'),
      project_id: this.envService.get('FIREBASE_PROJECT_ID'),
      private_key_id: this.envService.get('FIREBASE_PRIVATE_KEY_ID'),
      private_key: this.envService
        .get('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      client_email: this.envService.get('FIREBASE_CLIENT_EMAIL'),
      client_id: this.envService.get('FIREBASE_CLIENT_ID'),
      token_uri: this.envService.get('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: this.envService.get(
        'FIREBASE_AUTH_CERT_URL'
      ),
      client_x509_cert_url: this.envService.get('FIREBASE_CLIENT_CERT_URL'),
      universe_domain: this.envService.get('FIREBASE_UNIVERSAL_DOMAIN'),
    } as admin.ServiceAccount;
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });

    this.firebase = admin.app();
  }
}
