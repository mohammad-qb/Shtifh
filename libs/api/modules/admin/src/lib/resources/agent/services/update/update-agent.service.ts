import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { AdminUpdateAgentInput } from '../../inputs/update-agent.input';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class AdminUpdateAgentService {
  private logger = new Logger(AdminUpdateAgentService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Updates the information of an agent in the database based on the provided data.
   *
   * @param {AdminUpdateAgentInput} data - An object containing the new agent details such as agentId, color, position, salary, start_work_date, and additional user agent data to update.
   * @param {HeaderLanguage} lang - The language header used for error messaging.
   * @return {Promise<Object>} A promise that resolves to the updated agent object.
   * @throws Will throw an error if the agent with the specified id is not found.
   */
  async updateAgent(data: AdminUpdateAgentInput, lang: HeaderLanguage) {
    this.logger.log(`Updating agent with id ${data.agentId}`);
    const {
      agentId,
      color,
      position,
      salary,
      start_work_date,
      ...userAgentData
    } = data;
    const agent = await this.prismaService.agent.findFirst({
      where: { id: agentId },
    });

    if (!agent) throw this.httpErrorsService.agentNotFound(agentId, lang);

    const updatedAgent = await this.prismaService.agent.update({
      where: { id: agentId },
      data: {
        color,
        position,
        salary,
        start_work_date,
        user: { update: userAgentData },
      },
    });
    this.logger.log(`Agent updated with id ${agentId}`);
    return updatedAgent;
  }
}
