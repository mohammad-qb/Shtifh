import { Injectable, Logger } from '@nestjs/common';
import { AgentAcceptExpressCarWashOrderService } from './services/accept/accept-express-car-wash-order.service';
import { AgentCancelExpressCarWashOrderService } from './services/cancel/cancel-express-car-wash-order.service';
import { AgentCompleteExpressCarWashOrderService } from './services/complete/complete-express-car-wash-order.service';
import { AgentStartExpressCarWashOrderService } from './services/start/start-express-car-wash-order.service';
import { HeaderLanguage } from '@shtifh/decorators';
import { AgentCancelExpressCarWashOrderInput } from './inputs/cancel-express-car-wash-order.input';

@Injectable()
export class AgentExpressCarWashOrderResourceService {
  private logger = new Logger(AgentExpressCarWashOrderResourceService.name);

  constructor(
    private readonly agentAcceptExpressCarWashOrderService: AgentAcceptExpressCarWashOrderService,
    private readonly agentCancelExpressCarWashOrderService: AgentCancelExpressCarWashOrderService,
    private readonly agentCompleteExpressCarWashOrderService: AgentCompleteExpressCarWashOrderService,
    private readonly agentStartExpressCarWashOrderService: AgentStartExpressCarWashOrderService
  ) {}

  async accept(
    agentId: string,
    expressCarWashOrderId: string,
    lang: HeaderLanguage
  ) {
    return await this.agentAcceptExpressCarWashOrderService.acceptExpressCarWashOrder(
      agentId,
      expressCarWashOrderId,
      lang
    );
  }

  async cancel(
    agentId: string,
    input: AgentCancelExpressCarWashOrderInput,
    lang: HeaderLanguage
  ) {
    return await this.agentCancelExpressCarWashOrderService.cancelExpressCarWashOrder(
      agentId,
      input,
      lang
    );
  }

  async complete(agentId: string, expressCarWashOrderId: string) {
    return await this.agentCompleteExpressCarWashOrderService.completeExpressCarWashOrder(
      agentId,
      expressCarWashOrderId
    );
  }

  async start(
    agentId: string,
    expressCarWashOrderId: string,
    lang: HeaderLanguage
  ) {
    return await this.agentStartExpressCarWashOrderService.startExpressCarWashOrder(
      agentId,
      expressCarWashOrderId,
      lang
    );
  }
}
