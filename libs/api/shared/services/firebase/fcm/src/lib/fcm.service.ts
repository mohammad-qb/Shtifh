import { Injectable, Logger } from '@nestjs/common';
import { TopicMessage } from './types/fcm.type';
import { FCMConfigService } from './config/fcm-config.service';

@Injectable()
export class FCMService {
  private logger = new Logger(FCMService.name);

  constructor(private readonly cloudMessagingConfig: FCMConfigService) {}

  async send(args: TopicMessage) {
    return this.cloudMessagingConfig.firebase.messaging().send({
      topic: args.topic,
      notification: args.notification,
      data: args.data,
      android: {
        priority: 'high',
      },
    });
  }
}
