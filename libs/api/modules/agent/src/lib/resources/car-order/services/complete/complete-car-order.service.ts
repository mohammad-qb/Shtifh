import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { CarOrderLogStatus } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CompleteCarOrderService {
  private logger = new Logger(CompleteCarOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async completeCarOrder(
    agentId: string,
    carOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Completing car order with id ${carOrderId} for agent ${agentId}`
    );

    const carOrder = await this.prismaService.carOrder.findFirst({
      where: { id: carOrderId, agentId },
    });
    if (!carOrder) {
      throw this.httpErrorsService.carOrderNotFound(carOrderId, lang);
    }

    await this.prismaService.carOrder.update({
      where: { id: carOrderId },
      data: {
        logs: {
          push: {
            status: CarOrderLogStatus.COMPLETED,
            createdAt: new Date(),
          },
        },
      },
    });

    this.logger.log(
      `Car order with id ${carOrderId} found for agent ${agentId}`
    );
    return carOrder;
  }
}
