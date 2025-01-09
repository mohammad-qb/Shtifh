import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import {
  CreateNormalCarOrderInput,
  CreatePrivateCarOrderInput,
} from '../../inputs/create-car-order.input';
import {
  CarOrderLogStatus,
  CarServiceType,
  generateOrderRefNumber,
  newDate,
  PaymentMethod,
} from '@shtifh/helpers';
import { DateAccessService } from '@shtifh/date-access-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { CreateCarOrderValidator } from './validator/car-order-validator.service';
import { CalculateOrderFeesService } from '../../utils/calculate-order-fees.utils';

@Injectable()
export class CreateCarOrderService {
  private logger = new Logger(CreateCarOrderService.name);
  private hyPay;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly dataAccessService: DateAccessService,
    private readonly carOrderValidator: CreateCarOrderValidator,
    private readonly carOrderFeesCalculator: CalculateOrderFeesService
  ) {
    this.hyPay = this.dataAccessService.resources.hyPay;
  }

  /**
   * Creates a new normal car order for a user.
   *
   * This method performs various validations for the user, city, and service compatibility,
   * calculates fees, generates a reference number, and stores the order details in the database.
   * If the payment method is credit card, it also integrates with an external payment processing system.
   *
   * @param {string} customerId - The unique identifier of the customer placing the order.
   * @param {string} userId - The unique identifier of the user associated with the order.
   * @param {HeaderLanguage} lang - The language preference for validation messages or responses.
   * @param {CreateNormalCarOrderInput} data - The details of the car order, including service type,
   *                                           chosen accessories, address, and payment method.
   * @return {Promise<{paymentUrl: string | null}>} The URL for payment processing if the payment method is credit card,
   *                                                or null if no payment URL is required.
   */
  async createNormalOrder(
    customerId: string,
    userId: string,
    lang: HeaderLanguage,
    data: CreateNormalCarOrderInput
  ) {
    this.logger.log(`Create normal car order`);

    const user = await this.carOrderValidator.validateUser(userId, lang);
    const city = await this.carOrderValidator.validateCity(data.cityId, lang);
    await this.carOrderValidator.validateService(
      data.serviceId,
      lang,
      CarServiceType.PUBLIC
    );

    const cityService = city.car_model_services.find(
      (service) => service.serviceId === data.serviceId
    );

    if (!cityService) {
      throw new Error('Service not available in the selected city');
    }

    const accessories = await this.prismaService.accessory.findMany({
      where: { id: { in: data.accessories.map((a) => a.accessoryId) } },
    });

    const orderTips = data.tips || 0;
    const accessoriesFee = this.carOrderFeesCalculator.calculateAccessoriesFees(
      { accessories: data.accessories },
      accessories
    );
    const totalFees = this.carOrderFeesCalculator.calculateTotalFees(
      cityService.fees,
      accessoriesFee,
      orderTips
    );

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
        tips: orderTips,
        note: data.note || null,
        order_date: newDate(data.order_date).toISOString(),
        order_time: data.order_time,
        accessories: data.accessories,
        logs: [
          { status: CarOrderLogStatus.CREATED, createdAt: newDate().toDate() },
          {
            status:
              data.payment_method === PaymentMethod.CREDIT_CARD
                ? CarOrderLogStatus.PENDING_PAYMENT
                : CarOrderLogStatus.CONFIRMED,
            createdAt: newDate().toDate(),
          },
        ],
      },
    });

    let paymentUrl = null;
    if (data.payment_method === PaymentMethod.CREDIT_CARD) {
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
          payment_method: PaymentMethod.CREDIT_CARD,
          transaction_id: paymentIntent.signature,
        },
      });

      paymentUrl = paymentIntent.url;
    }

    this.logger.log(`Normal car order created`, { carOrder });
    return { paymentUrl };
  }

  /**
   * Creates a private car order for a given customer.
   *
   * @param {string} customerId - The ID of the customer creating the order.
   * @param {HeaderLanguage} lang - The language header for the request.
   * @param {CreatePrivateCarOrderInput} data - The input data for creating the car order.
   * @return {Promise<boolean>} A promise resolving to a boolean indicating the success of the operation.
   */
  async createPrivateOrder(
    customerId: string,
    lang: HeaderLanguage,
    data: CreatePrivateCarOrderInput
  ) {
    this.logger.log(`Create private car order`);

    await this.carOrderValidator.validateCity(data.cityId, lang);
    await this.carOrderValidator.validateService(
      data.serviceId,
      lang,
      CarServiceType.PRIVATE
    );

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
        note: data.note,
        logs: [
          {
            status: CarOrderLogStatus.CREATED,
            createdAt: newDate().toDate(),
          },
        ],
      },
    });

    this.logger.log(`Private car order created`);

    return true;
  }
}
