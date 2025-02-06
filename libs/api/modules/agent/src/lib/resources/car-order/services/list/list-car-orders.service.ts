import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentListCarOrdersService {
  private logger = new Logger(AgentListCarOrdersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Retrieves a list of car orders associated with a specific agent.
   *
   * @param {string} agentId - The unique identifier of the agent whose car orders are to be fetched.
   * @return {Promise<Array<Object>>} - A promise that resolves to an array of car order objects, including related customer, car, service, and city details.
   */
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
