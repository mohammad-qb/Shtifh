import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { AdminCreateAgentInput } from '../../inputs/create-agent.input';
import { UserService } from '@shtifh/user-service';

@Injectable()
export class AdminCreateAgentService {
  private logger = new Logger(AdminCreateAgentService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  /**
   * Creates a new agent with the specified information.
   *
   * @param {AdminCreateAgentInput} data - The input data required to create an agent,
   * including email, phone, full_name, and other agent-specific details.
   * @return {Promise<Agent>} A promise that resolves to the created agent object.
   */
  async createAgent(data: AdminCreateAgentInput) {
    this.logger.log('Creating agent');

    const { email, phone, full_name, ...restAgentData } = data;
    const password = await this.userService.cryptPassword(phone.slice(-6));

    const agent = await this.prismaService.agent.create({
      data: {
        ...restAgentData,
        wallet_summary: {
          total_tips: 0,
          total_orders_earn: 0,
        },
        user: { create: { email, phone, full_name, password } },
      },
    });
    this.logger.log(`Agent created with Id ${agent.id}`);
    return agent;
  }
}
