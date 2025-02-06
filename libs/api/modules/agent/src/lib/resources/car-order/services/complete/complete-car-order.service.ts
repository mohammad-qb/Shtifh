import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentCompleteCarOrderService {
  private logger = new Logger(AgentCompleteCarOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Completes a car order by updating its status to completed and appending a log entry.
   *
   * @param {string} agentId - The ID of the agent completing the car order.
   * @param {string} carOrderId - The unique identifier of the car order to be completed.
   * @param {HeaderLanguage} lang - The language preference for error messages and localization.
   * @return {Promise<object>} A promise that resolves to the completed car order object.
   * @throws Will throw an error if the car order is not found for the given agent and carOrderId.
   */
  async completeCarOrder(
    agentId: string,
    carOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Completing car order with id ${carOrderId} for agent ${agentId}`
    );

    const carOrder = await this.prismaService.carOrder.findFirst({
      where: { id: carOrderId, agentId },
    });
    if (!carOrder) {
      throw this.httpErrorsService.carOrderNotFound(carOrderId, lang);
    }

    await this.prismaService.carOrder.update({
      where: { id: carOrderId },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.COMPLETED,
            createdAt: new Date(),
          },
        },
      },
    });

    this.logger.log(
      `Car order with id ${carOrderId} found for agent ${agentId}`
    );
    return carOrder;
  }
}
