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
   * Retrieves a car order based on the provided customer ID and car order ID.
   *
   * @param {string} customerId - The ID of the customer.
   * @param {string} carOrderId - The ID of the car order.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @return {Promise<Object>} The car order details, including car model, brand, and agent information.
   * @throws Will throw an error if the car order is not found.
   */
  async getCarOrderById(
    customerId: string,
    carOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(`Get car order ${carOrderId} for customer ${customerId}`);
    const order = await this.prismaService.carOrder.findFirst({
      where: { customerId, id: carOrderId },
      include: { car: { include: { model: true, brand: true } }, agent: {include: {user: true}} },
    });

    if (!order) {
      this.logger.error(
        `Car order ${carOrderId} for customer ${customerId} not found`
      );
      throw this.httpErrorsService.carOrderNotFound(carOrderId, lang);
    }
    this.logger.log(`Car order ${carOrderId} for customer ${customerId} found`);
    return order;
  }
}
