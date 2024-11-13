import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import {
  CreateNormalCarOrderInput,
  CreatePrivateCarOrderInput,
} from '../../dtos/create-car-order.dto';
import { CarOrderLogStatus, newDate } from '@shtifh/helpers';
import { DateAccessService } from '@shtifh/date-access-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';

const generateOrderRefNumber = () => {
  return Math.floor(Math.random() * 90000000) + 10000000 + '';
};
@Injectable()
export class CreateCarOrderService {
  private logger = new Logger(CreateCarOrderService.name);
  private hyPay;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly dataAccessService: DateAccessService,
    private readonly httpErrorsService: HttpErrorsService
  ) {
    this.hyPay = this.dataAccessService.resources.hyPay;
  }

  async createNormalOrder(
    customerId: string,
    userId: string,
    lang: HeaderLanguage,
    data: CreateNormalCarOrderInput
  ) {
    this.logger.log(`Create car order`);

    const service = await this.prismaService.service.findFirst({
      where: { id: data.serviceId, type: 'PUBLIC' },
    });
    const city = await this.prismaService.city.findFirst({
      where: { id: data.cityId },
    });
    const accessories = await this.prismaService.accessory.findMany({
      where: {
        id: { in: data.accessories.map((accessory) => accessory.accessoryId) },
      },
    });
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw this.httpErrorsService.userNotFound(userId, lang);
    }
    if (!city) {
      throw this.httpErrorsService.cityNotFound(data.cityId, lang);
    }

    if (!service) {
      throw this.httpErrorsService.serviceNotFound(data.serviceId, lang);
    }

    if (service.type !== 'PUBLIC') {
      throw this.httpErrorsService.serviceNotPublic(data.serviceId, lang);
    }

    const cityService = city.car_model_services.find(
      (service) => service.serviceId === data.serviceId
    );

    if (!cityService) {
      throw this.httpErrorsService.serviceNotAvailable(data.serviceId, lang);
    }
    const accessoriesFees = data.accessories.reduce((acc, accessory) => {
      const accessoryItem = accessories.find(
        (el) => el.id === accessory.accessoryId
      );
      return acc + accessory.quantity * (accessoryItem?.price || 1);
    }, 0);

    const totalFees = cityService.fees + (data.tips || 0) + accessoriesFees;

    const refNumber = generateOrderRefNumber();
    const carOrder = await this.prismaService.carOrder.create({
      data: {
        ref_number: refNumber,
        fees: cityService.fees,
        customerId,
        address: data.address,
        carId: data.carId,
        cityId: data.cityId,
        serviceId: data.serviceId,
        tips: data.tips || 0,
        note: data.note || null,
        order_date: newDate(data.order_date),
        order_time: data.order_time,
        accessories: data.accessories,
        logs: [
          {
            status: CarOrderLogStatus.CREATED,
            createdAt: newDate(),
          },
          {
            status: CarOrderLogStatus.PENDING_PAYMENT,
            createdAt: newDate(),
          },
        ],
      },
    });

    const paymentIntent = await this.hyPay.paymentIntent({
      amount: totalFees,
      lang,
      orderRefNumber: refNumber,
      email: user.email,
      fullName: user.full_name,
      phone: user.phone,
    });

    await this.prismaService.payment.create({
      data: {
        amount: totalFees,
        carOrderId: carOrder.id,
        payment_method: 'CREDIT_CARD',
        transaction_id: paymentIntent.signature,
      },
    });

    this.logger.log(`Car order created`, carOrder);
    return paymentIntent.url;
  }

  async createPrivateOrder(
    customerId: string,
    lang: HeaderLanguage,
    data: CreatePrivateCarOrderInput
  ) {
    this.logger.log(`Create private car order`);

    const city = await this.prismaService.city.findFirst({
      where: { id: data.cityId },
    });

    const service = await this.prismaService.service.findFirst({
      where: { id: data.serviceId, type: 'PRIVATE' },
    });

    if (!city) {
      throw this.httpErrorsService.cityNotFound(data.cityId, lang);
    }

    if (!service) {
      throw this.httpErrorsService.serviceNotFound(data.serviceId, lang);
    }

    if (service.type !== 'PRIVATE') {
      throw this.httpErrorsService.serviceNotPublic(data.serviceId, lang);
    }

    await this.prismaService.carOrder.create({
      data: {
        ref_number: generateOrderRefNumber(),
        fees: 0,
        customerId,
        address: data.address,
        carId: data.carId,
        cityId: data.cityId,
        serviceId: data.serviceId,
        tips: 0,
        note: data.note || null,
        logs: [
          {
            status: CarOrderLogStatus.CREATED,
            createdAt: newDate(),
          },
        ],
      },
    });

    return true;
  }
}
