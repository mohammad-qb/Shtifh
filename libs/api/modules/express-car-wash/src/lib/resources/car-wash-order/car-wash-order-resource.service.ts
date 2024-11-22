import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { CancelCarWashOrderService } from './services/cancel/cancel-car-wash-order.service';
import { ListCarWashOrdersService } from './services/list/list-car-wash-orders.service';

@Injectable()
export class CarWashOrderResourceService {
  private logger = new Logger(CarWashOrderResourceService.name);

  constructor(
    private readonly cancelCarWashOrderService: CancelCarWashOrderService,
    private readonly listCarWashOrdersService: ListCarWashOrdersService
  ) {}

  async list(customerId: string) {
    return await this.listCarWashOrdersService.listCarWashOrders(customerId);
  }

  async cancel(
    customerId: string,
    carWashOrderId: string,
    lang: HeaderLanguage
  ) {
    return await this.cancelCarWashOrderService.cancelCarWashOrder(
      customerId,
      carWashOrderId,
      lang
    );
  }
}
