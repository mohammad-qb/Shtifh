import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { AgentCancelExpressCarWashOrderInput } from '../../inputs/cancel-express-car-wash-order.input';
import { CarOrderLogStatus } from '@shtifh/helpers';

@Injectable()
export class AgentCancelExpressCarWashOrderService {
  private logger = new Logger(AgentCancelExpressCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async cancelExpressCarWashOrder(
    agentId: string,
    data: AgentCancelExpressCarWashOrderInput,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Agent ${agentId} is trying to cancel express car wash order ${data.expressCarWashOrderId}`,
      { data }
    );

    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.findUnique({
        where: {
          id: data.expressCarWashOrderId,
        },
      });

    if (!expressCarWashOrder) {
      throw this.httpErrorsService.carWashOrderNotFound(
        data.expressCarWashOrderId,
        lang
      );
    }

    if (expressCarWashOrder.agentId !== agentId) {
      throw this.httpErrorsService.carWashOrderNotAssignedToAgent(
        data.expressCarWashOrderId,
        lang
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.CANCELED_BY_AGENT
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByAgent(
        data.expressCarWashOrderId,
        lang
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.CANCELED_BY_CUSTOMER
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByCustomer(
        data.expressCarWashOrderId,
        lang
      );
    }

    await this.prismaService.expressCarWashOrder.update({
      where: {
        id: data.expressCarWashOrderId,
      },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.CANCELED_BY_AGENT,
            createdAt: new Date(),
            note: data.reason,
          },
        },
      },
    });

    await this.prismaService.agent.update({
      where: { id: agentId },
      data: { is_busy: false },
    });

    this.logger.log(
      `Agent ${agentId} has successfully canceled express car wash order ${data.expressCarWashOrderId}`
    );
    return true;
  }
}
