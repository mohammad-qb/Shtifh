import { Module } from '@nestjs/common';
import {
  AgentStartExpressCarWashOrderLogHelper,
  AgentStartExpressCarWashOrderValidationHelper,
} from './start-express-car-wash-order.helper';

@Module({
  providers: [
    AgentStartExpressCarWashOrderLogHelper,
    AgentStartExpressCarWashOrderValidationHelper,
  ],
  exports: [
    AgentStartExpressCarWashOrderValidationHelper,
    AgentStartExpressCarWashOrderLogHelper,
  ],
})
export class AgentStartExpressCarWashOrderHelperModule {}
