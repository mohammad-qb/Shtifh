import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListCarOrdersService {
  private logger = new Logger(ListCarOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Lists car orders for a given customer.
   *
   * @param {string} customerId - The ID of the customer whose car orders are to be listed.
   * @return {Promise<Array>} A promise that resolves to an array of car orders associated with the customer.
   */
  async listCarOrders(customerId: string) {
    this.logger.log(`List car orders for customer ${customerId}`);
    const carOrders = await this.prismaService.carOrder.findMany({
      where: { customerId },
      include: {
        car: { include: { model: true, brand: true } },
        service: true,
      },
    });

    this.logger.log(`Car orders for customer ${customerId} listed`);
    return carOrders;
  }
}
