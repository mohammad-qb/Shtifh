import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CancelCarWashOrderService {
  private logger = new Logger(CancelCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async cancelCarWashOrder(
    customerId: string,
    carWashOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Cancel car wash order ${carWashOrderId} for customer ${customerId}`
    );

    const carWashOrder = await this.prismaService.expressCrWashOrder.findFirst({
      where: { id: carWashOrderId, customerId },
    });

    if (!carWashOrder) {
      this.logger.error(`Car wash order ${carWashOrderId} not found`);
      throw this.httpErrorsService.carWashOrderNotFound(carWashOrderId, lang);
    }

    const carWashOrderCurrentStatus =
      carWashOrder.logs[carWashOrder.logs.length - 1].status;

    if (
      carWashOrderCurrentStatus === CarOrderLogStatus.CANCELED_BY_CUSTOMER ||
      carWashOrderCurrentStatus === CarOrderLogStatus.CANCELED_BY_AGENT
    ) {
      this.logger.error(`Car wash order ${carWashOrderId} already cancelled`);
      return this.httpErrorsService.carWashOrderAlreadyCancelled(
        carWashOrderId,
        lang
      );
    }

    const updatedCarWashOrder =
      await this.prismaService.expressCrWashOrder.update({
        where: { id: carWashOrderId },
        data: {
          logs: {
            push: {
              status: CarOrderLogStatus.CANCELED_BY_CUSTOMER,
              createdAt: new Date(),
            },
          },
        },
      });

    this.logger.log(`Car wash order ${carWashOrderId} cancelled successfully`);
    return updatedCarWashOrder;
  }
}
