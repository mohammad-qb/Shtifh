import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DateAccessService } from '@shtifh/date-access-service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HeaderLang } from '@shtifh/decorators';

@Injectable()
export class OrderResourceService {
  private logger = new Logger(OrderResourceService.name);
  private model;
  private carModelServiceModel;
  private paymentModel;
  private customerModel;
  private takbull;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly dataAccessService: DateAccessService
  ) {
    this.model = prismaService.order;
    this.carModelServiceModel = prismaService.carModelService;
    this.takbull = dataAccessService.resources.takbull;
    this.paymentModel = this.prismaService.payment;
    this.customerModel = prismaService.customer;
  }

  async create(customerId: string, lang: HeaderLang, args: CreateOrderDto) {
    const refNumber = Math.floor(Math.random() * 90000000) + 10000000 + '';

    const customer = await this.customerModel.findFirst({
      where: { id: customerId },
      include: { user: true },
    });

    if (!customer) throw new BadRequestException('user_wrong');

    const order = await this.model.create({
      data: {
        ...args,
        ref_number: refNumber,
        customerId,
        type: args.date ? 'ORDER' : 'BOOK_LATER',
      },
    });

    const modelService = await this.carModelServiceModel.findFirst({
      where: { id: args.carModelServiceId },
    });

    const OrderTotalSum = (modelService?.fees || 0) + (args.tip || 0);
    const paymentIntent = await this.takbull.paymentIntent({
      order_reference: refNumber,
      OrderTotalSum: OrderTotalSum,
      lang,
      email: customer.user.email,
      phone: customer.user.mobile,
    });

    await this.paymentModel.create({
      data: {
        fees: OrderTotalSum,
        uniq_id: paymentIntent.uniqId,
        orderId: order.id,
      },
    });

    return {
      url: paymentIntent,
      success: true,
    };
  }

  async list(customerId: string) {
    const orders = await this.model.findMany({
      where: { customerId, paid: true },
      select: {
        id: true,
        city: {
          select: {
            name_ar: true,
            name_en: true,
            name_he: true,
          },
        },
        date: true,
        note: true,
        address: true,
        service: {
          include: {
            service: {
              select: {
                id: true,
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
          },
        },
        car: {
          select: {
            color: true,
            id: true,
            name: true,
          },
        },
      },
    });

    return { results: orders };
  }

  async update(orderId: string, args: UpdateOrderDto, lang: HeaderLang) {
    const order = await this.model.findFirst({ where: { id: orderId } });
    if (!order) throw new BadRequestException('order_not_exist');

    if (order.carModelServiceId === args.carModelServiceId) {
      await this.model.update({
        where: { id: orderId },
        data: args,
      });

      return { success: true, url: null };
    } else {
      const customer = await this.customerModel.findFirst({
        where: { id: order.customerId },
        include: { user: true },
      });
      if (!customer) throw new BadRequestException('user_not_exist');

      const modelService = await this.carModelServiceModel.findFirst({
        where: { id: args.carModelServiceId },
      });
      const OrderTotalSum = modelService?.fees || 0;

      const paymentIntent = await this.takbull.paymentIntent({
        order_reference: order.ref_number,
        OrderTotalSum: OrderTotalSum,
        lang,
        email: customer.user.email,
        phone: customer.user.mobile,
      });

      await this.paymentModel.create({
        data: {
          fees: OrderTotalSum,
          uniq_id: paymentIntent.uniqId,
          orderId: order.id,
        },
      });

      return {
        url: paymentIntent,
        success: true,
      };
    }
  }

  async lastInvoice(customerId: string) {
    const invoice = await this.model.findFirst({
      where: { customerId, paid: true },
      select: {
        ref_number: true,
        city: {
          select: {
            name_ar: true,
            name_en: true,
            name_he: true,
          },
        },
        address: true,
        date: true,
        time: true,
        Payment: {
          select: { fees: true },
          orderBy: { createAt: 'desc' },
          take: 1,
        },
        service: {
          select: {
            service: {
              select: {
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!invoice) return null;

    const { service, Payment, ...rest } = invoice;

    return { ...rest, service: service.service, fees: Payment[0].fees };
  }
}
