import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateExpressCarWashOrderInput } from '../../inputs/create-express-car-wash-order.input';
import {
  generateOrderRefNumber,
  EXPRESS_CAR_WASH_FEES,
  CarOrderLogStatus,
} from '@shtifh/helpers';
import { FCMService } from '@shtifh/fcm-service';
import { GetAvailableAgentsService } from '../../../../utils/get-available-agents.service';

@Injectable()
export class CreateExpressCarWashOrderService {
  private logger = new Logger(CreateExpressCarWashOrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly getAvailableAgentsService: GetAvailableAgentsService,
    private readonly fcmService: FCMService
  ) {}

  /**
   * Creates a new express car wash order for the given customer.
   *
   * @param {string} customerId - The unique identifier of the customer placing the order.
   * @param {CreateExpressCarWashOrderInput} data - The data required to create the express car wash order, including carId and coordinates.
   * @return {Promise<Object>} A promise that resolves to the created express car wash order object.
   */
  async createExpressCarWashOrder(
    customerId: string,
    data: CreateExpressCarWashOrderInput
  ) {
    this.logger.log(
      `Create express car wash order for customer ${customerId}`,
      { data }
    );

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
        include: {
          car: true,
          customer: {
            include: {
              user: {
                select: {
                  full_name: true,
                },
              },
            },
          },
        },
      });

    const agents = await this.getAvailableAgentsService.get();

    agents.forEach((el) => {
      this.fcmService.send({
        data: JSON.stringify({
          id: expressCarWashOrder.id,
          customerId: expressCarWashOrder.customerId,
          order: {
            customerName: expressCarWashOrder.customer.user.full_name,
            coordinate: expressCarWashOrder.coordinates,
          },
        }),
        notification: {
          body: 'A new car wash request',
          title: 'New car wash request',
        },
        userId: el.userId,
      });
    });

    this.logger.log(
      `Express car wash order created for customer ${customerId}`
    );
    return expressCarWashOrder;
  }
}
