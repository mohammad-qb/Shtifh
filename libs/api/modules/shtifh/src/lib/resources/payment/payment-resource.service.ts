import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { format } from 'date-fns';

type PaymentArgs = {
  lang: 'en' | 'he' | 'ar';
  uniqId: string;
  statusCode: string;
  Last4Digits: string;
  ordernumber: string;
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
    console.log(args);
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

    await this.prismaService.bookedSlots.create({
      data: {
        date: format(new Date(order.date), 'dd/MM/yyyy'),
        time: order.time,
        cityId: order.cityId,
        orderId: order.id,
      },
    });

    await this.prismaService.reminderOrders.create({
      data: {
        orderId: payment.orderId,
      },
    });
    if (args.lang === 'ar') return 'تم الدفع بنجاح';
    else if (args.lang === 'he') return 'תשלום בוצע בהצלחה';
    else return 'payment successfully';
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
    if (args.lang === 'ar') return 'لم تتم عملية الدفع';
    else if (args.lang === 'he') return 'התשלום נכשל';
    else return 'payment failed';
  }
}
