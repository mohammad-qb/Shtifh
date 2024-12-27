import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { ConfirmExpressCarWashOrderInput } from '../../inputs/confirm-express-car-wash-order.input';
import { DateAccessService } from '@shtifh/date-access-service';
import { CarOrderLogStatus, PaymentMethod } from '@shtifh/helpers';

@Injectable()
export class ConfirmExpressCarWashOrderService {
  private logger = new Logger(ConfirmExpressCarWashOrderService.name);
  private hyPay;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly dataAccessService: DateAccessService,
    private readonly httpErrorsService: HttpErrorsService
  ) {
    this.hyPay = this.dataAccessService.resources.hyPay;
  }

  async confirmExpressCarWashOrder(
    customerId: string,
    data: ConfirmExpressCarWashOrderInput,
    language: HeaderLanguage
  ) {
    this.logger.log(
      `Confirm express car wash order for customer ${customerId} by agent ${data.agentId}`,
      { data }
    );

    const agent = await this.prismaService.agent.findUnique({
      where: { id: data.agentId },
    });

    if (!agent)
      throw this.httpErrorsService.agentNotFound(data.agentId, language);

    if (!agent.is_available || agent.is_busy)
      throw this.httpErrorsService.agentNotAvailable(data.agentId, language);

    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.findUnique({
        where: { id: data.expressCarWashOrderId },
        include: { customer: { include: { user: true } } },
      });

    if (!expressCarWashOrder)
      throw this.httpErrorsService.carWashOrderNotFound(
        data.expressCarWashOrderId,
        language
      );

    const totalFees = expressCarWashOrder.fees + data.tips;

    //* Cash payment */
    if (data.payment_method === PaymentMethod.CASH) {
      await this.prismaService.expressCarWashOrder.update({
        where: { id: expressCarWashOrder.id },
        data: {
          agentId: data.agentId,
          tips: data.tips,
          logs: {
            push: {
              status: CarOrderLogStatus.CONFIRMED,
              createdAt: new Date(),
            },
          },
        },
      });

      await this.prismaService.payment.create({
        data: {
          amount: totalFees,
          expressCarWashOrderId: data.expressCarWashOrderId,
          payment_method: PaymentMethod.CASH,
          transaction_id: null,
        },
      });

      this.logger.log(
        `Express car wash order with id ${data.expressCarWashOrderId} for customer ${customerId} confirmed by agent ${data.agentId}`
      );
      return {expressCarWashOrder, url: null};
    }

    //* Credit card payment */
    const paymentIntent = await this.hyPay.paymentIntent({
      amount: totalFees,
      lang: language,
      orderType: 'express',
      orderRefNumber: expressCarWashOrder.ref_number,
      email: expressCarWashOrder.customer.user.email,
      fullName: expressCarWashOrder.customer.user.full_name,
      phone: expressCarWashOrder.customer.user.phone,
    });

    await this.prismaService.payment.create({
      data: {
        amount: totalFees,
        expressCarWashOrderId: data.expressCarWashOrderId,
        payment_method: PaymentMethod.CREDIT_CARD,
        transaction_id: paymentIntent.signature,
      },
    });

    await this.prismaService.expressCarWashOrder.update({
      where: { id: expressCarWashOrder.id },
      data: {
        tips: data.tips,
        agentId: data.agentId,
        logs: {
          push: {
            status: CarOrderLogStatus.PENDING_PAYMENT,
            createdAt: new Date(),
          },
        },
      },
    });

    this.logger.log(
      `Express car wash order with Id ${data.expressCarWashOrderId} for customer ${customerId} confirmed by agent ${data.agentId}`
    );
    return { expressCarWashOrder, url: paymentIntent.url };
  }
}
