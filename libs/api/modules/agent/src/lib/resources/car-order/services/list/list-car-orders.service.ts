import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListCarOrdersService {
  private logger = new Logger(ListCarOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listCarOrders(agentId: string) {
    this.logger.log(`List car orders for agent ${agentId}`);

    const carOrders = await this.prismaService.carOrder.findMany({
      where: { agentId },
      include: {
        customer: true,
        car: { include: { brand: true, model: true } },
        service: true,
        city: true,
      },
    });

    this.logger.log(`Found ${carOrders.length} car orders`);
    return carOrders;
  }
}
