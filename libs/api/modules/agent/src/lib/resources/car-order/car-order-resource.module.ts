import { Module } from '@nestjs/common';
import { AgentCarOrderResourceResolver } from './car-order-resource.resolver';
import { CarOrderResourceService } from './car-order-resource.service';
import { AgentListCarOrdersModule } from './services/list/list-car-orders.module';
import { AgentGetCarOrderModule } from './services/get-one/get-car-order.module';
import { AgentCancelCarOrderModule } from './services/cancel/cancel-car-order.module';
import { AgentCompleteCarOrderModule } from './services/complete/complete-car-order.module';

@Module({
  imports: [
    AgentListCarOrdersModule,
    AgentGetCarOrderModule,
    AgentCancelCarOrderModule,
    AgentCompleteCarOrderModule,
  ],
  providers: [AgentCarOrderResourceResolver, CarOrderResourceService],
  exports: [AgentCarOrderResourceResolver],
})
export class AgentCarOrderResourceModule {}
