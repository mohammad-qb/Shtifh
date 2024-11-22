import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';
import { AgentCancelCarOrderInput } from '../../inputs/cancel-car-order.input';

@Injectable()
export class CancelCarOrderService {
  private logger = new Logger(CancelCarOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async cancelCarOrder(
    agentId: string,
    data: AgentCancelCarOrderInput,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Cancel car order with id ${data.carOrderId} for agent ${agentId}`
    );

    const carOrder = await this.prismaService.carOrder.findFirst({
      where: { id: data.carOrderId },
      include: { agent: true },
    });

    if (!carOrder) {
      throw this.httpErrorsService.carOrderNotFound(data.carOrderId, lang);
    }

    if (carOrder.agentId !== agentId) {
      throw this.httpErrorsService.carOrderNotBelongToAgent(data.carOrderId, lang);
    }

    const carOrderStatus = carOrder.logs[carOrder.logs.length - 1].status;

    if (
      carOrderStatus === CarOrderLogStatus.CANCELED_BY_AGENT ||
      carOrderStatus === CarOrderLogStatus.CANCELED_BY_CUSTOMER
    ) {
      throw this.httpErrorsService.carOrderAlreadyCancelled(data.carOrderId, lang);
    }

    const updatedCarOrder = await this.prismaService.carOrder.update({
      where: { id: data.carOrderId },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.CANCELED_BY_AGENT,
            note: data.reason,
            createdAt: new Date(),
          },
        },
      },
    });

    this.logger.log(`Car order with id ${data.carOrderId} was successfully canceled`);

    return updatedCarOrder;
  }
}
