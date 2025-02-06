import { Injectable, Logger } from '@nestjs/common';
import { AgentListCarOrdersService } from './services/list/list-car-orders.service';
import { AgentGetCarOrderService } from './services/get-one/get-car-order.service';
import { AgentCancelCarOrderService } from './services/cancel/cancel-car-order.service';
import { AgentCancelCarOrderInput } from './inputs/cancel-car-order.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { AgentCompleteCarOrderService } from './services/complete/complete-car-order.service';

@Injectable()
export class CarOrderResourceService {
  private logger = new Logger(CarOrderResourceService.name);

  constructor(
    private readonly listCarOrdersService: AgentListCarOrdersService,
    private readonly getCarOrderService: AgentGetCarOrderService,
    private readonly cancelCarOrderService: AgentCancelCarOrderService,
    private readonly completeCarOrderService: AgentCompleteCarOrderService
  ) {}

  async cancel(
    agentId: string,
    input: AgentCancelCarOrderInput,
    lang: HeaderLanguage
  ) {
    await this.cancelCarOrderService.cancelCarOrder(agentId, input, lang);

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
