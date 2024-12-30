import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class GetCarOrderService {
  private logger = new Logger(GetCarOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Retrieves a car order by its ID for a specific agent.
   *
   * @param {string} agentId - The ID of the agent requesting the car order.
   * @param {string} carOrderId - The unique identifier of the car order to retrieve.
   * @param {HeaderLanguage} lang - The language header for localized responses or error messages.
   * @return {Promise<Object>} A promise that resolves to the car order object, including related information such as customer, car details, service, and city. Throws an error if the car order is not found.
   */
  async getCarOrderById(
    agentId: string,
    carOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Getting car order with id ${carOrderId} for agent ${agentId}`
    );

    const carOrder = await this.prismaService.carOrder.findFirst({
      where: { id: carOrderId, agentId },
      include: {
        customer: true,
        car: { include: { brand: true, model: true } },
        service: true,
        city: true,
      },
    });
    if (!carOrder) {
      throw this.httpErrorsService.carOrderNotFound(carOrderId, lang);
    }

    this.logger.log(
      `Car order with id ${carOrderId} found for agent ${agentId}`
    );
    return carOrder;
  }
}
