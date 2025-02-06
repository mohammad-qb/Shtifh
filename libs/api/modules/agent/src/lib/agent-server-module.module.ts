import { Module } from '@nestjs/common';
import { AgentAvailabilityResourceModule } from './resources/availability/availability-resource.module';
import { AgentCarOrderResourceModule } from './resources/car-order/car-order-resource.module';
import { AgentExpressCarWashOrderResourceModule } from './resources/express-car-wash-order/express-car-wash-order.module';

const GRAPHQL_MODULES = [
  AgentAvailabilityResourceModule,
  AgentCarOrderResourceModule,
  AgentExpressCarWashOrderResourceModule,
];
@Module({
  imports: [...GRAPHQL_MODULES],
})
export class AgentServerModule {}
