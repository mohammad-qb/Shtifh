import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class GetAvailableAgentsService {
  private logger = new Logger(GetAvailableAgentsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async get() {
    return await this.prismaService.agent.findMany({
      where: {
        is_available: true,
        is_busy: false,
      },
    });
  }
}
