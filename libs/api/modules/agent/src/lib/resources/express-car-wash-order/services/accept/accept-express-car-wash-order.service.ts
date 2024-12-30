import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentAcceptExpressCarWashOrderService {
  private logger = new Logger(AgentAcceptExpressCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async acceptExpressCarWashOrder(
    agentId: string,
    expressCarWashOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Agent ${agentId} is trying to accept express car wash order ${expressCarWashOrderId}`
    );

    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.findUnique({
        where: {
          id: expressCarWashOrderId,
        },
      });

    if (!expressCarWashOrder) {
      throw this.httpErrorsService.carWashOrderNotFound(
        expressCarWashOrderId,
        lang
      );
    }

    if (expressCarWashOrder.agentId) {
      throw this.httpErrorsService.carWashOrderAlreadyTaken(
        expressCarWashOrderId,
        lang
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.CANCELED_BY_CUSTOMER
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByCustomer(
        expressCarWashOrderId,
        lang
      );
    }

    await this.prismaService.expressCarWashOrder.update({
      where: {
        id: expressCarWashOrderId,
      },
      data: {
        agentId,
        logs: {
          push: {
            status: CarOrderLogStatus.ACCEPTED_BY_AGENT,
            createdAt: new Date(),
          },
        },
      },
    });

    await this.prismaService.agent.update({
      where: { id: agentId },
      data: { is_busy: true },
    });

    this.logger.log(
      `Agent ${agentId} accepted express car wash order ${expressCarWashOrderId}`
    );

    return true;
  }
}
