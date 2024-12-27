import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListExpressCarWashOrdersService {
  private logger = new Logger(ListExpressCarWashOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

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
