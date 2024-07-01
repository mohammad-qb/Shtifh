import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
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

    const modelService = await this.carModelServiceModel.findFirst({
      where: { id: args.carModelServiceId },
    });

    const accessories =
      args.accessoriesIds.length > 0
        ? await this.prismaService.accessories.findMany({
            where: { id: { in: args.accessoriesIds } },
            select: {
              id: true,
              price: true,
            },
          })
        : [];

    let accessoriesTotalPrice = 0;
    for (const acc of accessories) {
      accessoriesTotalPrice += acc.price;
    }

    const order = await this.model.create({
      data: {
        ...args,
        fees:
          (modelService?.fees || 0) + accessoriesTotalPrice + (args.tip || 0),
        ref_number: refNumber,
        customerId,
        type: 'ORDER',
        accessoriesIds: args.accessoriesIds,
      },
    });

    const OrderTotalSum =
      (modelService?.fees || 0) + (args.tip || 0) + accessoriesTotalPrice;
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

  async list(customerId: string, isDone: boolean, lang: HeaderLang) {
    const orders = await this.model.findMany({
      where: { customerId, paid: true, is_canceled: false, is_done: isDone },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        time: true,
        date: true,
        address: true,
        city: {
          select: { id: true, name_ar: true, name_en: true, name_he: true },
        },
        employee: {
          select: {
            user: {
              select: {
                full_name: true,
              },
            },
          },
        },
        service: {
          select: {
            service: {
              select: { id: true, name_ar: true, name_en: true, name_he: true },
            },
          },
        },
        car: {
          select: {
            brand: {
              select: {
                id: true,
                image_url: true,
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
            model: {
              select: { id: true, name_ar: true, name_en: true, name_he: true },
            },
          },
        },
      },
    });

    return {
      results: orders.map((el) => ({
        id: el.id,
        time: el.time,
        date: el.date,
        address: el.address,
        city: {
          id: el.city.id,
          name: el.city[`name_${lang}`],
        },
        employee: el.employee,
        service: {
          id: el.service.service.id,
          name: el.service.service[`name_${lang}`],
        },
        car: {
          brand: {
            image_url: el.car.brand.image_url,
            name: el.car.brand[`name_${lang}`],
            id: el.car.brand.id,
          },
          model: {
            id: el.car.model.id,
            name: el.car.model[`name_${lang}`],
          },
        },
      })),
    };
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

  async done(id: string, empId: string) {
    const order = await this.model.findFirst({
      where: { id, employeeId: empId },
    });

    if (!order) throw new BadGatewayException('Private order not exist');

    await this.model.update({ where: { id }, data: { is_done: true } });

    return { success: true };
  }

  async nextUpcoming(customerId: string) {
    const order = await this.prismaService.order.findFirst({
      where: {
        customerId,
        is_done: false,
        is_canceled: false,
        paid: true,
        date: {
          gt: new Date().toISOString(),
        },
      },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        time: true,
        date: true,
        address: true,
        city: { select: { name_ar: true, name_en: true, name_he: true } },
        employee: {
          select: {
            user: {
              select: {
                full_name: true,
              },
            },
          },
        },
        service: {
          select: {
            service: {
              select: { name_ar: true, name_en: true, name_he: true },
            },
          },
        },
        car: {
          select: {
            brand: {
              select: {
                image_url: true,
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
            model: { select: { name_ar: true, name_en: true, name_he: true } },
          },
        },
      },
    });

    return order;
  }

  async cancelOrder(id: string, customerId: string) {
    const order = await this.prismaService.order.findFirst({
      where: { id, customerId },
    });

    if (!order) throw new BadRequestException('order_not_exist');

    await this.prismaService.order.update({
      where: { id },
      data: { is_canceled: true },
    });

    return { success: true };
  }
}
