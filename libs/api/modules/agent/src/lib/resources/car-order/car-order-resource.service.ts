import { Injectable, Logger } from '@nestjs/common';
import { ListCarOrdersService } from './services/list/list-car-orders.service';
import { GetCarOrderService } from './services/get-one/get-car-order.service';
import { CancelCarOrderService } from './services/cancel/cancel-car-order.service';
import { AgentCancelCarOrderInput } from './inputs/cancel-car-order.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { CompleteCarOrderService } from './services/complete/complete-car-order.service';

@Injectable()
export class CarOrderResourceService {
  private logger = new Logger(CarOrderResourceService.name);

  constructor(
    private readonly listCarOrdersService: ListCarOrdersService,
    private readonly getCarOrderService: GetCarOrderService,
    private readonly cancelCarOrderService: CancelCarOrderService,
    private readonly completeCarOrderService: CompleteCarOrderService
  ) {}

  async cancel(
    agentId: string,
    input: AgentCancelCarOrderInput,
    lang: HeaderLanguage
  ) {
    await this.cancelCarOrderService.cancelCarOrder(
      agentId,
      input,
      lang
    );

    return true;
  }

  complete(agentId: string, carOrderId: string, lang: HeaderLanguage) {
    this.completeCarOrderService.completeCarOrder(agentId, carOrderId, lang);
    return true;
  }

  async list(agentId: string) {
    return await this.listCarOrdersService.listCarOrders(agentId);
  }

  async getById(agentId: string, carOrderId: string, lang: HeaderLanguage) {
    return await this.getCarOrderService.getCarOrderById(
      agentId,
      carOrderId,
      lang
    );
  }
}
