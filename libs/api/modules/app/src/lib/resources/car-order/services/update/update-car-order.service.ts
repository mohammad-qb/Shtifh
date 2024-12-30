import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UpdateNormalCarOrderInput } from '../../inputs/update-car-order.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { DateAccessService } from '@shtifh/date-access-service';
import { CarOrderType, PaymentMethod } from '@shtifh/helpers';

@Injectable()
export class UpdateCarOrderService {
  private logger = new Logger(UpdateCarOrderService.name);
  private hyPay;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly dataAccessService: DateAccessService,
    private readonly httpErrorsService: HttpErrorsService
  ) {
    this.hyPay = this.dataAccessService.resources.hyPay;
  }

  /**
   * Updates a normal car order for a given customer.
   *
   * @param {string} customerId - The ID of the customer making the request.
   * @param {UpdateNormalCarOrderInput} data - The data to update the car order.
   * @param {HeaderLanguage} lang - The language for error messages and other localized content.
   * @return {Promise<{paymentUrl: string | null}>} - A promise that resolves to an object containing a payment link if additional fees are required, otherwise null.
   */
  async updateNormalCarOrder(
    customerId: string,
    data: UpdateNormalCarOrderInput,
    lang: HeaderLanguage
  ): Promise<{ paymentUrl: string | null }> {
    this.logger.log(
      `Update car order with id ${data.carOrderId} for customer ${customerId}`
    );

    const { carOrderId, ...restCarOrderData } = data;
    const carOrder = await this.prismaService.carOrder.findFirst({
      where: { id: carOrderId },
      include: { customer: { include: { user: true } } },
    });
    let paymentUrl = null;

    if (!carOrder) {
      throw this.httpErrorsService.carOrderNotFound(carOrderId, lang);
    }

    if (carOrder.customerId !== customerId) {
      throw this.httpErrorsService.orderNotBelongToCustomer(carOrderId, lang);
    }

    if (carOrder.type !== CarOrderType.NORMAL) {
      throw this.httpErrorsService.orderNotNormalType(carOrderId, lang);
    }

    const city = await this.prismaService.city.findFirst({
      where: { id: data.cityId },
    });

    if (!city) {
      throw this.httpErrorsService.cityNotFound(data.cityId, lang);
    }

    const car = await this.prismaService.car.findFirst({
      where: { id: data.carId, customerId },
    });

    if (!car) {
      throw this.httpErrorsService.carNotFound(data.carId, lang);
    }

    const carModelService = city.car_model_services.find(
      (el) => el.serviceId === data.serviceId
    );

    if (!carModelService) {
      throw this.httpErrorsService.serviceNotAvailableForCity(
        data.serviceId,
        data.cityId,
        lang
      );
    }

    if (carModelService.carModelId !== car.carModelId) {
      throw this.httpErrorsService.serviceNotAvailableForCarModel(
        data.serviceId,
        car.carModelId,
        lang
      );
    }

    if (carModelService.fees <= carOrder.fees) {
      await this.prismaService.carOrder.update({
        where: { id: carOrderId },
        data: restCarOrderData,
      });
      return { paymentUrl };
    }

    const totalFees = carModelService.fees - carOrder.fees;

    const paymentIntent = await this.hyPay.paymentIntent({
      amount: totalFees,
      lang,
      orderRefNumber: carOrder.ref_number,
      email: carOrder.customer.user.email,
      fullName: carOrder.customer.user.full_name,
      phone: carOrder.customer.user.phone,
    });

    await this.prismaService.payment.create({
      data: {
        amount: totalFees,
        carOrderId: carOrder.id,
        payment_method: PaymentMethod.CREDIT_CARD,
        transaction_id: paymentIntent.signature,
      },
    });

    paymentUrl = paymentIntent.url;

    //TODO: save in cache the data to set them after payment with order id as key

    this.logger.log(
      `Car order ${data.carOrderId} updated for customer ${customerId}`
    );

    return { paymentUrl };
  }
}
