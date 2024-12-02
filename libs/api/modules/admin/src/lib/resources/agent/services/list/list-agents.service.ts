import { Injectable, Logger } from '@nestjs/common';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AdminListAgentsService {
  private logger = new Logger(AdminListAgentsService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Asynchronously retrieves a list of agents from the database and logs the process.
   *
   * @return {Promise<Array>} A promise that resolves to an array of agent objects.
   */
  async listAgents() {
    this.logger.log('Listing agents');
    const agents = await this.prismaService.agent.findMany({
      include: { user: true },
    });
    this.logger.log(`Listing ${agents.length} agents`);
    return agents;
  }
}
