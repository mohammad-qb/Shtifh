import { Injectable, Logger } from '@nestjs/common';
import { TopicMessage } from './types/fcm.type';
import { FCMConfigService } from './config/fcm-config.service';

function getTopic(userId?: string) {
  return userId ? `notify-user-${userId}` : 'notify-app';
}
@Injectable()
export class FCMService {
  private logger = new Logger(FCMService.name);

  constructor(private readonly cloudMessagingConfig: FCMConfigService) {}

  async send(args: TopicMessage) {
    return this.cloudMessagingConfig.firebase.messaging().send({
      topic: getTopic(args.userId),
      notification: args.notification,
      data: args.data,
      android: {
        priority: 'high',
      },
    });
  }
}
