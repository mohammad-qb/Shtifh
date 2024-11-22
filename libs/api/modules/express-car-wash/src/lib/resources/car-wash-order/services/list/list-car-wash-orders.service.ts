import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class ListCarWashOrdersService {
  private logger = new Logger(ListCarWashOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listCarWashOrders(customerId: string) {
    this.logger.log(`List car wash orders for customer ${customerId}`);

    const carWashOrders = await this.prismaService.expressCrWashOrder.findMany({
      where: { customerId },
    });

    this.logger.log(`Found ${carWashOrders.length} car wash orders`);
    return carWashOrders;
  }
}
