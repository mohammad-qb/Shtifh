import { Injectable, Logger } from '@nestjs/common';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentCompleteExpressCarWashOrderService {
  private readonly logger = new Logger(
    AgentCompleteExpressCarWashOrderService.name
  );

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Completes an express car wash order assigned to an agent.
   * Validates the order's existence, ownership, and status before completing it.
   * Updates the order's status to completed in the logs and marks the agent as not busy.
   *
   * @param {string} agentId - The unique identifier of the agent attempting to complete the order.
   * @param {string} expressCarWashOrderId - The unique identifier of the express car wash order to be completed.
   * @return {Promise<boolean>} A promise that resolves to true if the order is successfully completed.
   * @throws {Error} If the order is not found, not assigned to the agent, already canceled (by agent or customer), or already completed.
   */
  async completeExpressCarWashOrder(
    agentId: string,
    expressCarWashOrderId: string
  ) {
    this.logger.log(
      `Agent ${agentId} is trying to complete express car wash order ${expressCarWashOrderId}`
    );

    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.findUnique({
        where: {
          id: expressCarWashOrderId,
        },
      });

    if (!expressCarWashOrder) {
      throw this.httpErrorsService.carWashOrderNotFound(expressCarWashOrderId);
    }

    if (expressCarWashOrder.agentId !== agentId) {
      throw this.httpErrorsService.carWashOrderNotAssignedToAgent(
        expressCarWashOrderId
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.CANCELED_BY_AGENT
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByAgent(
        expressCarWashOrderId
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.CANCELED_BY_CUSTOMER
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByCustomer(
        expressCarWashOrderId
      );
    }

    if (
      expressCarWashOrder.logs[expressCarWashOrder.logs.length - 1].status ===
      CarOrderLogStatus.COMPLETED
    ) {
      throw this.httpErrorsService.carWashOrderAlreadyCompleted(
        expressCarWashOrderId
      );
    }

    await this.prismaService.expressCarWashOrder.update({
      where: {
        id: expressCarWashOrderId,
      },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.COMPLETED,
            createdAt: new Date(),
          },
        },
      },
    });

    await this.prismaService.agent.update({
      where: { id: agentId },
      data: { is_busy: false },
    });

    this.logger.log(
      `Agent ${agentId} has completed express car wash order ${expressCarWashOrderId}`
    );
    return true;
  }
}
