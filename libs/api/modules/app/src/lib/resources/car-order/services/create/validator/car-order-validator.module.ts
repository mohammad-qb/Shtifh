import { Module } from '@nestjs/common';
import { CreateCarOrderValidator } from './car-order-validator.service';

@Module({
  providers: [CreateCarOrderValidator],
  exports: [CreateCarOrderValidator],
})
export class CreateCarOrderValidatorModule {}
