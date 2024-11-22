import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class GetCarOrderService {
  private logger = new Logger(GetCarOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async getCarOrderById(
    customerId: string,
    carOrderId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(`Get car order ${carOrderId} for customer ${customerId}`);
    const order = await this.prismaService.carOrder.findFirst({
      where: { customerId, id: carOrderId },
      include: { car: { include: { model: true, brand: true } }, agent: {include: {user: true}} },
    });

    if (!order) {
      this.logger.error(
        `Car order ${carOrderId} for customer ${customerId} not found`
      );
      throw this.httpErrorsService.carOrderNotFound(carOrderId, lang);
    }
    this.logger.log(`Car order ${carOrderId} for customer ${customerId} found`);
    return order;
  }
}
