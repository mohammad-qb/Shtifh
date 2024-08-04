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
}
