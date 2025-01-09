import { Injectable } from '@nestjs/common';
import { HttpErrorsService } from '@shtifh/exception-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { ExpressCarWashOrder } from '@prisma/client';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentStartExpressCarWashOrderValidationHelper {
  constructor(private readonly httpErrorsService: HttpErrorsService) {}

  /**
   * Validates that the order is found; throws an error if the order is not found.
   *
   * @param {ExpressCarWashOrder} order - The order object to validate.
   * @param {string} orderId - The identifier of the order being validated.
   * @param {HeaderLanguage} lang - The language information from the request header.
   * @return {void} Throws an error if the order is not found.
   */
  validateOrderFound(
    order: ExpressCarWashOrder | null,
    orderId: string,
    lang: HeaderLanguage
  ): void {
    if (!order) {
      throw this.httpErrorsService.carWashOrderNotFound(orderId, lang);
    }
  }

  /**
   * Validates if the provided agent is assigned to the given car wash order.
   * If the agent is not assigned, an error is thrown.
   *
   * @param {ExpressCarWashOrder} order - The car wash order to be validated.
   * @param {string} agentId - The ID of the agent being validated for the order.
   * @param {string} orderId - The ID of the order being checked for assignment.
   * @param {HeaderLanguage} lang - The preferred language for error messages.
   * @return {void} This method does not return a value.
   */
  validateAgentAssignment(
    order: ExpressCarWashOrder,
    agentId: string,
    orderId: string,
    lang: HeaderLanguage
  ): void {
    if (order.agentId !== agentId) {
      throw this.httpErrorsService.carWashOrderNotAssignedToAgent(
        orderId,
        lang
      );
    }
  }

  /**
   * Validates the status of the given car wash order and throws an error if the order
   * has been canceled by the agent, canceled by the customer, or is currently in progress.
   *
   * @param {ExpressCarWashOrder} order - The car wash order to validate.
   * @param {string} orderId - The unique identifier for the order.
   * @param {HeaderLanguage} lang - The language header to use for error messages.
   * @return {void} Does not return a value. Throws an error if the order status is invalid.
   */
  validateOrderStatus(
    order: ExpressCarWashOrder,
    orderId: string,
    lang: HeaderLanguage
  ): void {
    const lastStatus = order.logs[order.logs.length - 1]?.status;

    if (lastStatus === CarOrderLogStatus.CANCELED_BY_AGENT) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByAgent(
        orderId,
        lang
      );
    }

    if (lastStatus === CarOrderLogStatus.CANCELED_BY_CUSTOMER) {
      throw this.httpErrorsService.carWashOrderAlreadyCanceledByCustomer(
        orderId,
        lang
      );
    }

    if (lastStatus === CarOrderLogStatus.IN_PROGRESS) {
      throw this.httpErrorsService.carWashOrderAlreadyStarted(orderId, lang);
    }
  }
}

@Injectable()
export class AgentStartExpressCarWashOrderLogHelper {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Updates the order log status to "IN_PROGRESS" for a given order.
   *
   * @param {string} orderId - The unique identifier of the order to update.
   * @return {Promise<void>} A promise that resolves when the order log status has been successfully updated.
   */
  async updateOrderLogToInProgress(orderId: string) {
    await this.prismaService.expressCarWashOrder.update({
      where: { id: orderId },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.IN_PROGRESS,
            createdAt: new Date(),
          },
        },
      },
    });
  }
}
