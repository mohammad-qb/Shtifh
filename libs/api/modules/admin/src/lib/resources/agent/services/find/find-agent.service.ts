import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class AdminFindAgentService {
  private logger = new Logger(AdminFindAgentService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Finds an agent by their unique identifier.
   *
   * @param agentId - The unique identifier of the agent to be found.
   * @param lang - The language code for error messages, defaults to 'en'.
   * @returns The agent object if found, otherwise throws an error.
   * @throws Will throw an error if the agent is not found.
   */
  async findAgent(agentId: string, lang: HeaderLanguage = 'en') {
    this.logger.log(`Finding agent with ID: ${agentId}`);
    const agent = await this.prismaService.agent.findFirst({
      where: { id: agentId },
      include: { user: true },
    });
    if (!agent) throw this.httpErrorsService.agentNotFound(agentId, lang);
    this.logger.log(`Agent with Id ${agentId} Found`);
    return agent;
  }
}
