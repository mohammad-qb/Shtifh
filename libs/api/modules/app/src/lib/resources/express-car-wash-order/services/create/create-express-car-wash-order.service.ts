import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateExpressCarWashOrderInput } from '../../inputs/create-express-car-wash-order.input';
import {
  generateOrderRefNumber,
  EXPRESS_CAR_WASH_FEES,
  CarOrderLogStatus,
} from '@shtifh/helpers';

@Injectable()
export class CreateExpressCarWashOrderService {
  private logger = new Logger(CreateExpressCarWashOrderService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createExpressCarWashOrder(
    customerId: string,
    data: CreateExpressCarWashOrderInput
  ) {
    this.logger.log(`Create express car wash order for customer ${customerId}`, {data});

    const refNumber = generateOrderRefNumber();

    const expressCarWashOrder =
      await this.prismaService.expressCarWashOrder.create({
        data: {
          ref_number: refNumber,
          fees: EXPRESS_CAR_WASH_FEES,
          tips: 0,
          carId: data.carId,
          coordinates: data.coordinates,
          customerId,
          logs: [
            {
              status: CarOrderLogStatus.CREATED,
              createdAt: new Date(),
            },
            {
              status: CarOrderLogStatus.SEARCHING,
              createdAt: new Date(),
            },
          ],
        },
      });

    this.logger.log(
      `Express car wash order created for customer ${customerId}`
    );
    return expressCarWashOrder;
  }
}
