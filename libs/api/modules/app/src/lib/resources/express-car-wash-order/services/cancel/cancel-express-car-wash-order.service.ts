import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CancelExpressCarWashOrderService {
  private logger = new Logger(CancelExpressCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Cancels an express car wash order for the specified customer.
   *
   * @param {string} customerId - The ID of the customer requesting to cancel the order.
   * @param {string} expressCarWashOrderId - The ID of the express car wash order to be canceled.
   * @param {HeaderLanguage} lang - The language preference for error messages or logs.
   * @return {Promise<Object>} - The updated express car wash order data after the cancellation.
   * @throws Will throw an error if the order does not exist or if the order does not belong to the customer.
   */
  async cancelExpressCarWashOrder(
    customerId: string,
    expressCarWashOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Cancel express car wash order with id ${expressCarWashOrderId} for customer ${customerId}`
    );

    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.findUnique({
        where: { id: expressCarWashOrderId },
      });

    if (!expressCarWashOrder)
      throw this.httpErrorsService.carWashOrderNotFound(
        expressCarWashOrderId,
        lang
      );

    if (expressCarWashOrder.customerId !== customerId)
      throw this.httpErrorsService.orderNotBelongToCustomer(
        expressCarWashOrderId,
        lang
      );

    const updatedExpressCarWashOrder =
      await this.prismaService.expressCarWashOrder.update({
        where: { id: expressCarWashOrderId },
        data: {
          logs: {
            push: {
              status: CarOrderLogStatus.CANCELED_BY_CUSTOMER,
              createdAt: new Date(),
            },
          },
        },
      });

    this.logger.log(
      `Express car wash order canceled with id ${expressCarWashOrderId} for customer ${customerId}`
    );
    return updatedExpressCarWashOrder;
  }
}
