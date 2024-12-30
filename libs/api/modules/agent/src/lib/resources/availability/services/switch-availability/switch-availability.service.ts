import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AgentSwitchAvailabilityService {
  private logger = new Logger(AgentSwitchAvailabilityService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Toggles the availability status of an agent.
   *
   * @param agentId - The unique identifier of the agent whose availability needs to be switched.
   * @param lang - The language preference for any error messages or logs.
   * @return A promise that resolves to a boolean indicating the successful update of the agent's availability.
   */
  async switchAvailability(agentId: string, lang: HeaderLanguage) {
    this.logger.log(`Switch the availability for the agent with Id ${agentId}`);

    const agent = await this.prismaService.agent.findUnique({
      where: { id: agentId },
    });

    if (!agent) throw this.httpErrorsService.agentNotFound(agentId, lang);

    await this.prismaService.agent.update({
      where: { id: agentId },
      data: {
        is_available: !agent.is_available,
      },
    });

    this.logger.log(
      `Switch the availability to ${!agent.is_available} for the agent with Id ${agentId}`
    );
    return true;
  }
}
