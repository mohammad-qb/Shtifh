import { Injectable, Logger } from '@nestjs/common';
import { FCMService } from '@shtifh/fcm-service';
import { PrismaService } from '@shtifh/prisma-service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { $Enums } from '@prisma/client';
import moment = require('moment');

function setNotificationText(
  lang: $Enums.Lang,
  type: 'order-em' | 'order-cu',
  options: { date: string; time: string }
) {
  if (type === 'order-cu') {
    if (lang === 'AR')
      return {
        title: 'تذكير بطلبك القادم',
        body: `نود أن نذكرك بطلبك القادم في ${options.date} الساعة ${options.time}. نتمنى لك تجربة رائعة.`,
      };
    else if (lang === 'EN')
      return {
        title: 'Reminder for Your Upcoming Order',
        body: `We would like to remind you of your upcoming order on ${options.date} at ${options.time}. We wish you a great experience.`,
      };
    else
      return {
        title: 'תזכורת להזמנה הקרובה שלך',
        body: `ברצוננו להזכיר לך על ההזמנה הקרובה שלך בתאריך ${options.date} בשעה ${options.time}. אנו מאחלים לך חוויה נהדרת.`,
      };
  } else {
    if (lang === 'AR')
      return {
        title: 'تذكير بطلبك القادم',
        body: `نود أن نذكرك بطلبك القادم في ${options.date} الساعة ${options.time}`,
      };
    else if (lang === 'EN')
      return {
        title: 'Reminder for Your Upcoming Order',
        body: `We would like to remind you of your upcoming order on ${options.date} at ${options.time}.`,
      };
    else
      return {
        title: 'תזכורת להזמנה הקרובה שלך',
        body: `ברצוננו להזכיר לך על ההזמנה הקרובה שלך בתאריך ${options.date} בשעה ${options.time}`,
      };
  }
}

@Injectable()
export class OrdersReminderService {
  private logger = new Logger(OrdersReminderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fcmService: FCMService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10PM, { timeZone: 'Asia/Jerusalem' })
  async execute() {
    try {
      console.log('Start Reminder');
      const currentDate = new Date();
      const nextDay = new Date();
      const sDate = moment(currentDate).format('YYYY-MM-DD');
      nextDay.setDate(currentDate.getDate() + 1);
      const eDate = moment(nextDay).format('YYYY-MM-DD');
      console.log({
        gte: sDate + 'T00:00:00.000Z',
        lt: eDate + 'T00:00:00.000Z',
      });

      const orders = await this.prismaService.reminderOrders.findMany({
        where: {
          order: {
            date: {
              gte: sDate + 'T00:00:00.000Z',
              lt: eDate + 'T00:00:00.000Z',
            },
          },
        },
        include: {
          order: {
            include: {
              customer: { include: { user: true } },
              employee: { include: { user: true } },
            },
          },
        },
      });

      const privateOrders =
        await this.prismaService.reminderPrivateOrders.findMany({
          where: {
            order: {
              date: {
                gte: sDate + 'T00:00:00.000Z',
                lt: eDate + 'T00:00:00.000Z',
              },
            },
          },
          include: {
            order: {
              include: {
                customer: { include: { user: true } },
                employee: { include: { user: true } },
              },
            },
          },
        });

      for (const element of orders) {
        await this.fcmService.send({
          data: {},
          topic: `user-${element.order.employee?.user.id}`,
          notification: setNotificationText(
            element.order.employee?.user.lang || 'EN',
            'order-em',
            {
              date: element.order.date.toDateString(),
              time: element.order.time,
            }
          ),
        });

        element.order.employee &&
          (await this.prismaService.notification.create({
            data: {
              for_all: false,
              userId: element.order.employee?.userId || '',
              type: 'REMINDER',
              content_ar: setNotificationText('AR', 'order-em', {
                date: element.order.date.toDateString(),
                time: element.order.time,
              }).body,
              content_en: setNotificationText('EN', 'order-em', {
                date: element.order.date.toDateString(),
                time: element.order.time,
              }).body,
              content_he: setNotificationText('HE', 'order-em', {
                date: element.order.date.toDateString(),
                time: element.order.time,
              }).body,
            },
          }));

        await this.fcmService.send({
          data: {},
          topic: `user-${element.order.customer?.user.id}`,
          notification: setNotificationText(
            element.order.customer?.user.lang || 'EN',
            'order-cu',
            {
              date: element.order.date.toDateString(),
              time: element.order.time,
            }
          ),
        });

        element.order.customer &&
          (await this.prismaService.notification.create({
            data: {
              for_all: false,
              userId: element.order.customer?.userId || '',
              type: 'REMINDER',
              content_ar: setNotificationText('AR', 'order-cu', {
                date: element.order.date.toDateString(),
                time: element.order.time,
              }).body,
              content_en: setNotificationText('EN', 'order-cu', {
                date: element.order.date.toDateString(),
                time: element.order.time,
              }).body,
              content_he: setNotificationText('HE', 'order-cu', {
                date: element.order.date.toDateString(),
                time: element.order.time,
              }).body,
            },
          }));
      }

      for (const element of privateOrders) {
        await this.fcmService.send({
          data: {},
          topic: `user-${element.order.employee?.user.id}`,
          notification: setNotificationText(
            element.order.employee?.user.lang || 'EN',
            'order-em',
            {
              date: element.order.date?.toDateString() || '',
              time: element.order.time || '',
            }
          ),
        });

        element.order.employee &&
          (await this.prismaService.notification.create({
            data: {
              for_all: false,
              userId: element.order.employee?.userId || '',
              type: 'REMINDER',
              content_ar: setNotificationText('AR', 'order-em', {
                date: element.order.date?.toDateString() || '',
                time: element.order.time || '',
              }).body,
              content_en: setNotificationText('EN', 'order-em', {
                date: element.order.date?.toDateString() || '',
                time: element.order.time || '',
              }).body,
              content_he: setNotificationText('HE', 'order-em', {
                date: element.order.date?.toDateString() || '',
                time: element.order.time || '',
              }).body,
            },
          }));

        await this.fcmService.send({
          data: {},
          topic: `user-${element.order.customer?.user.id}`,
          notification: setNotificationText(
            element.order.customer?.user.lang || 'EN',
            'order-cu',
            {
              date: element.order.date?.toDateString() || '',
              time: element.order.time || '',
            }
          ),
        });

        element.order.customer &&
          (await this.prismaService.notification.create({
            data: {
              for_all: false,
              userId: element.order.customer?.userId || '',
              type: 'REMINDER',
              content_ar: setNotificationText('AR', 'order-cu', {
                date: element.order.date?.toDateString() || '',
                time: element.order.time || '',
              }).body,
              content_en: setNotificationText('EN', 'order-cu', {
                date: element.order.date?.toDateString() || '',
                time: element.order.time || '',
              }).body,
              content_he: setNotificationText('HE', 'order-cu', {
                date: element.order.date?.toDateString() || '',
                time: element.order.time || '',
              }).body,
            },
          }));
      }

      orders.length > 0 &&
        (await this.prismaService.reminderOrders.deleteMany({
          where: { id: { in: orders.map((el) => el.id) } },
        }));
      privateOrders.length > 0 &&
        (await this.prismaService.reminderPrivateOrders.deleteMany({
          where: { id: { in: orders.map((el) => el.id) } },
        }));

      console.log(
        `Reminder Sent for ${orders.length} Orders and private orders ${privateOrders.length}`
      );
    } catch (error) {
      console.log(error);
    }
  }
}
