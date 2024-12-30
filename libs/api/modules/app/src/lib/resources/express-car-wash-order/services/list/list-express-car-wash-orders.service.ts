import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListExpressCarWashOrdersService {
  private logger = new Logger(ListExpressCarWashOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Lists all express car wash orders for the specified customer.
   *
   * @param {string} customerId - The unique identifier of the customer whose express car wash orders are to be retrieved.
   * @return {Promise<Array>} A promise that resolves to an array of express car wash orders for the given customer.
   */
  async listExpressCarWashOrders(customerId: string) {
    this.logger.log(`List express car wash orders for customer ${customerId}`);

    const expressCarWashOrders =
      await this.prismaService.expressCarWashOrder.findMany({
        where: { customerId },
      });

    this.logger.log(
      `Found ${expressCarWashOrders.length} express car wash orders for customer ${customerId}`
    );
    return expressCarWashOrders;
  }
}
