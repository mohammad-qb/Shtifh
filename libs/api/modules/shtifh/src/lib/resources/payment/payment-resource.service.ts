import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { IpnOrderDetails } from './types/payment.type';
type PaymentArgs = {
  lang: 'en' | 'he' | 'ar';
  orderId: string;
  transactionInternalNumber: string;
  order_reference: string;
  uniqId: string;
  statusCode: string;
  token: string;
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

  async success(args: PaymentArgs) {
    const payment = await this.prismaService.payment.findFirst({
      where: { uniq_id: args.uniqId },
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
        orderId: payment.orderId,
      },
    });

    if (args.lang === 'ar') return 'تم الدفع بنجاح';
    else if (args.lang === 'he') return 'תשלום בוצע בהצלחה';
    else return 'payment successfully';
  }

  async failed(args: PaymentArgs) {
    const payment = await this.prismaService.payment.findFirst({
      where: { uniq_id: args.uniqId },
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
    if (args.lang === 'ar') return 'لم تتم عملية الدفع';
    else if (args.lang === 'he') return 'התשלום נכשל';
    else return 'payment failed';
  }
}
