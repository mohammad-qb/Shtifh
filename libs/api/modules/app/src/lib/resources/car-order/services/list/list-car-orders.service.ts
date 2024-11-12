import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListCarOrdersService {
  private logger = new Logger(ListCarOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listCarOrders(customerId: string) {
    this.logger.log(`List car orders for customer ${customerId}`);
    const carOrders = await this.prismaService.carOrder.findMany({
      where: { customerId },
      include: { car: { include: { model: true, brand: true } } },
    });

    this.logger.log(`Car orders for customer ${customerId} listed`);
    return carOrders;
  }
}
