import { Module } from '@nestjs/common';
import { AgentAcceptExpressCarWashOrderModule } from './services/accept/accept-express-car-wash-order.module';
import { AgentStartExpressCarWashOrderModule } from './services/start/start-express-car-wash-order.module';
import { AgentCompleteExpressCarWashOrderModule } from './services/complete/complete-express-car-wash-order.module';
import { AgentExpressCarWashOrderResourceResolver } from './express-car-wash-order.resolver';
import { AgentExpressCarWashOrderResourceService } from './express-car-wash-order.service';
import { AgentCancelExpressCarWashOrderModule } from './services/cancel/cancel-express-car-wash-order.module';

@Module({
  imports: [
    AgentAcceptExpressCarWashOrderModule,
    AgentStartExpressCarWashOrderModule,
    AgentCompleteExpressCarWashOrderModule,
    AgentCancelExpressCarWashOrderModule,
  ],
  providers: [
    AgentExpressCarWashOrderResourceResolver,
    AgentExpressCarWashOrderResourceService,
  ],
  exports: [
    AgentExpressCarWashOrderResourceResolver,
    AgentExpressCarWashOrderResourceService,
  ],
})
export class AgentExpressCarWashOrderResourceModule {}
