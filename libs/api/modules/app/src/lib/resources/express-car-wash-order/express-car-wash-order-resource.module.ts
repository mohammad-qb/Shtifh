import { Module } from '@nestjs/common';
import { ListExpressCarWashOrdersModule } from './services/list/list-express-car-wash-orders.module';
import { CreateExpressCarWashOrderModule } from './services/create/create-express-car-wash-order.module';
import { CancelExpressCarWashOrderModule } from './services/cancel/cancel-express-car-wash-order.module';
import { ConfirmExpressCarWashOrderModule } from './services/confirm/confirm-express-car-wash-order.module';
import { ExpressCarWashOrderResourceResolver } from './express-car-wash-order-resource.resolver';
import { ExpressCarWashOrderResourceService } from './express-car-wash-order-resource.service';

@Module({
  imports: [
    ListExpressCarWashOrdersModule,
    CreateExpressCarWashOrderModule,
    CancelExpressCarWashOrderModule,
    ConfirmExpressCarWashOrderModule,
  ],
  providers: [
    ExpressCarWashOrderResourceResolver,
    ExpressCarWashOrderResourceService,
  ],
  exports: [ExpressCarWashOrderResourceResolver],
})
export class ExpressCarWashOrderResourceModule {}
