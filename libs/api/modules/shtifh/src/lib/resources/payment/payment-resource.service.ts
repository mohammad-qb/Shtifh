import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { IpnOrderDetails } from './types/payment.type';

@Injectable()
export class PaymentResourceService {
  private logger = new Logger(PaymentResourceService.name);
  private model;
  private orderModel;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.payment;
    this.orderModel = prismaService.order;
  }

  async ipn(args: IpnOrderDetails) {
    console.log({ paymentArgs: args });
    const payment = await this.model.update({
      where: {
        uniq_id: args.uniqId,
      },
      data: {
        status: args.StatusCode === 0 ? 'SUCCESS' : 'FAILED',
      },
    });

    console.log({ payment });

    const order = await this.orderModel.update({
      where: { id: payment.orderId },
      data: { paid: true },
    });

    console.log({ order });

    return { success: true };
  }

  async success(id: string, lang: 'en' | 'ar' | 'he') {
    const payment = await this.prismaService.payment.findFirst({
      where: { orderId: id },
      orderBy: { createAt: 'desc' },
    });
    console.log({ success_payment: payment });
    if (!payment) return;

    await this.model.update({
      where: {
        id: payment.id,
      },
      data: {
        status: 'SUCCESS',
      },
    });

    await this.orderModel.update({
      where: { id: payment.orderId },
      data: { paid: true },
    });

    await this.prismaService.reminderOrders.create({
      data: {
        orderId: id,
      },
    });

    if (lang === 'ar') return 'تم الدفع بنجاح';
    else if (lang === 'he') return 'תשלום בוצע בהצלחה';
    else return 'payment successfully';
  }

  async failed(id: string, lang: 'en' | 'ar' | 'he') {
    const payment = await this.prismaService.payment.findFirst({
      where: { orderId: id },
      orderBy: { createAt: 'desc' },
    });
    console.log({ failed_payment: payment });
    if (!payment) return;

    await this.model.update({
      where: {
        id: payment.id,
      },
      data: {
        status: 'FAILED',
      },
    });
    if (lang === 'ar') return 'لم تتم عملية الدفع';
    else if (lang === 'he') return 'התשלום נכשל';
    else return 'payment failed';
  }
}
