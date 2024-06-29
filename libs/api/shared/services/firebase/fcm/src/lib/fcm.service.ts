import * as admin from 'firebase-admin';
import privateKey from './data/privateKey.json';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FCMService {
  private logger = new Logger(FCMService.name);

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(privateKey),
    });
  }

  async sendToTopic(topic: string, payload: admin.messaging.MessagingPayload) {
    try {
      await admin.messaging().sendToTopic(topic, payload);
      console.log(`Notification sent to topic ${topic} successfully`);
    } catch (error) {
      console.error(`Error sending notification to topic ${topic}:`, error);
    }
  }
}
