import { Injectable, Logger } from '@nestjs/common';
import { CancelExpressCarWashOrderService } from './services/cancel/cancel-express-car-wash-order.service';
import { ConfirmExpressCarWashOrderService } from './services/confirm/confirm-express-car-wash-order.service';
import { CreateExpressCarWashOrderService } from './services/create/create-express-car-wash-order.service';
import { HeaderLanguage } from '@shtifh/decorators';
import { ConfirmExpressCarWashOrderInput } from './inputs/confirm-express-car-wash-order.input';
import { CreateExpressCarWashOrderInput } from './inputs/create-express-car-wash-order.input';
import { ListExpressCarWashOrdersService } from './services/list/list-express-car-wash-orders.service';

@Injectable()
export class ExpressCarWashOrderResourceService {
  private logger = new Logger(ExpressCarWashOrderResourceService.name);

  constructor(
    private readonly cancelExpressCarWashOrderService: CancelExpressCarWashOrderService,
    private readonly confirmExpressCarWashOrderService: ConfirmExpressCarWashOrderService,
    private readonly createExpressCarWashOrderService: CreateExpressCarWashOrderService,
    private readonly listExpressServicesService: ListExpressCarWashOrdersService
  ) {}

  async cancelExpressCarWashOrder(
    id: string,
    customerId: string,
    lang: HeaderLanguage
  ) {
    await this.cancelExpressCarWashOrderService.cancelExpressCarWashOrder(
      customerId,
      id,
      lang
    );
    return true;
  }

  async confirmExpressCarWashOrder(
    customerId: string,
    input: ConfirmExpressCarWashOrderInput,
    lang: HeaderLanguage
  ) {
    const result =
      await this.confirmExpressCarWashOrderService.confirmExpressCarWashOrder(
        customerId,
        input,
        lang
      );
    return { paymentUrl: result.url };
  }

  async createExpressCarWashOrder(
    customerId: string,
    data: CreateExpressCarWashOrderInput
  ) {
    return await this.createExpressCarWashOrderService.createExpressCarWashOrder(
      customerId,
      data
    );
  }

  async listExpressCarWashOrders(customerId: string) {
    return await this.listExpressServicesService.listExpressCarWashOrders(
      customerId
    );
  }
}
