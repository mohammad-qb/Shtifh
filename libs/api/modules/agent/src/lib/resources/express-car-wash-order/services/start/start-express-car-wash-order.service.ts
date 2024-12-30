import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentStartExpressCarWashOrderService {
  private logger = new Logger(AgentStartExpressCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async startExpressCarWashOrder(
    agentId: string,
    expressCarWashOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Agent ${agentId} is trying to start express car wash order ${expressCarWashOrderId}`
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

    if (expressCarWashOrder.agentId !== agentId) {
      throw this.httpErrorsService.carWashOrderNotAssignedToAgent(
        expressCarWashOrderId,
        lang
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.CANCELED_BY_AGENT
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByAgent(
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

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.IN_PROGRESS
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyStarted(
        expressCarWashOrderId,
        lang
      );
    }

    await this.prismaService.expressCarWashOrder.update({
      where: {
        id: expressCarWashOrderId,
      },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.IN_PROGRESS,
            createdAt: new Date(),
          },
        },
      },
    });

    this.logger.log(
      `Agent ${agentId} successfully started express car wash order ${expressCarWashOrderId}`
    );
    return true;
  }
}
