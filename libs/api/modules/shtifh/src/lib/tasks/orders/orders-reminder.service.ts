import { Injectable, Logger } from '@nestjs/common';
import { FCMService } from '@shtifh/fcm-service';
import { PrismaService } from '@shtifh/prisma-service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrdersReminderService {
  private logger = new Logger(OrdersReminderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fcmService: FCMService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async execute() {
    // const result = await this.fcmService.send({
    //     data: {},
    //     topic: 'something',
    //     notification: {
    //         title: 'test',
    //         body: 'body'
    //     }
    // })
    // console.log({ result });
  }
}
