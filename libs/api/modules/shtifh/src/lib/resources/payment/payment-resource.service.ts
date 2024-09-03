import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { format } from 'date-fns';

type PaymentArgs = {
  lang: 'en' | 'he' | 'ar';
  uniqId: string;
  statusCode: string;
  Last4Digits: string;
  ordernumber: string;
  mode: 'create' | 'update';
};

@Injectable()
export class PaymentResourceService {
  private logger = new Logger(PaymentResourceService.name);
  private model;
  private orderModel;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.payment;
    this.orderModel = prismaService.order;
  }

  async success(args: PaymentArgs) {
    const payment = await this.prismaService.payment.findFirst({
      where: { uniq_id: args.ordernumber },
    });
    if (!payment) throw new UnauthorizedException();

    await this.model.update({
      where: {
        id: payment.id,
      },
      data: {
        status: 'SUCCESS',
      },
    });

    const order = await this.orderModel.update({
      where: { id: payment.orderId },
      data: { paid: true },
    });

    const bookedSlot = await this.prismaService.bookedSlots.findFirst({
      where: { orderId: order.id },
    });

    if (bookedSlot) {
      await this.prismaService.bookedSlots.delete({
        where: { id: bookedSlot.id },
      });
    } else {
      await this.prismaService.bookedSlots.create({
        data: {
          date: format(new Date(order.date), 'yyyy-MM-dd'),
          time: order.time,
          cityId: order.cityId,
          orderId: order.id,
        },
      });
    }

    if (args.mode === 'update') {
      await this.orderModel.update({
        where: { id: order.id },
        data: order.updatedData as any,
      });
    }

    await this.prismaService.reminderOrders.create({
      data: {
        orderId: payment.orderId,
      },
    });
    if (args.lang === 'ar')
      return {
        title: 'نجاح!',
        message: 'تمت العملية بنجاح. شكراً لاستخدامك خدمتنا.',
        redirectUrl: '/',
      };
    else if (args.lang === 'he')
      return {
        title: 'הצלחה!',
        message: 'הפעולה שלך הצליחה. תודה שהשתמשת בשירות שלנו.',
        redirectUrl: '/',
      };
    else
      return {
        title: 'Success!',
        message:
          'Your operation was successful. Thank you for using our service.',
        redirectUrl: '/',
      };
  }

  async failed(args: PaymentArgs) {
    const payment = await this.prismaService.payment.findFirst({
      where: { uniq_id: args.ordernumber },
    });
    if (!payment) return;

    await this.model.update({
      where: {
        id: payment.id,
      },
      data: {
        status: 'FAILED',
      },
    });
    if (args.lang === 'ar')
      return {
        title: 'فشلت العملية',
        message: 'للأسف، لم تتم العملية بنجاح. يرجى المحاولة مرة أخرى لاحقاً.',
      };
    else if (args.lang === 'he')
      return {
        title: 'הפעולה נכשלה',
        message:
          'לצערנו, לא ניתן היה להשלים את הפעולה. אנא נסה שוב מאוחר יותר.',
      };
    else
      return {
        title: 'Operation Failed',
        message:
          'Unfortunately, your operation could not be completed. Please try again later.',
      };
  }
}
