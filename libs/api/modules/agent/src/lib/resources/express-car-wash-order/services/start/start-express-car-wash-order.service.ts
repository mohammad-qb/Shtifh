import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import {
  AgentStartExpressCarWashOrderLogHelper,
  AgentStartExpressCarWashOrderValidationHelper,
} from './helpers/start-express-car-wash-order.helper';
import { FCMService } from '@shtifh/fcm-service';

@Injectable()
export class AgentStartExpressCarWashOrderService {
  private logger = new Logger(AgentStartExpressCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly agentStartExpressCarWashValidationHelper: AgentStartExpressCarWashOrderValidationHelper,
    private readonly agentStartExpressCarWashLogHelper: AgentStartExpressCarWashOrderLogHelper,
    private readonly fcmService: FCMService
  ) {}

  /**
   * Starts an express car wash order by validating the order and updating its status.
   *
   * @param {string} agentId - The unique identifier of the agent attempting to start the order.
   * @param {string} expressCarWashOrderId - The unique identifier of the express car wash order.
   * @param {HeaderLanguage} lang - The language preferences for error messages and validations.
   * @return {Promise<boolean>} A promise that resolves to true if the order was successfully started, otherwise an error will be thrown.
   */
  async startExpressCarWashOrder(
    agentId: string,
    expressCarWashOrderId: string,
    lang: HeaderLanguage
  ): Promise<boolean> {
    this.logger.log(
      `Agent ${agentId} is trying to start express car wash order ${expressCarWashOrderId}`
    );

    //* Retrieve the order
    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.findUniqueOrThrow({
        where: { id: expressCarWashOrderId },
        include: { customer: true },
      });

    //* Validate the order
    this.agentStartExpressCarWashValidationHelper.validateOrderFound(
      expressCarWashOrder,
      expressCarWashOrderId,
      lang
    );
    this.agentStartExpressCarWashValidationHelper.validateAgentAssignment(
      expressCarWashOrder!,
      agentId,
      expressCarWashOrderId,
      lang
    );
    this.agentStartExpressCarWashValidationHelper.validateOrderStatus(
      expressCarWashOrder!,
      expressCarWashOrderId,
      lang
    );

    //* Update the order log
    await this.agentStartExpressCarWashLogHelper.updateOrderLogToInProgress(
      expressCarWashOrderId
    );

    //* Send Update to the customer*/
    this.fcmService.send({
      data: {
        expressCarWashOrderId,
      },
      notification: {
        body: 'Agent start cleaning, We will inform you once it is done',
        title: 'Agent Starts Cleaning',
      },
      userId: expressCarWashOrder.customer.userId,
    });

    this.logger.log(
      `Agent ${agentId} successfully started express car wash order ${expressCarWashOrderId}`
    );

    return true;
  }
}
