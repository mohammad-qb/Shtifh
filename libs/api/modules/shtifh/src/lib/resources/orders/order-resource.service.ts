import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DateAccessService } from '@shtifh/date-access-service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HeaderLang } from '@shtifh/decorators';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { Payload } from '@shtifh/user-service';
import { Prisma } from '@prisma/client';
import { FCMService } from '@shtifh/fcm-service';
import { CityResourceService } from '../city/city-resource.service';

const done_order_msg = {
  AR: {
    title: 'تم إتمام الطلب بنجاح',
    body: 'تم إتمام طلبك بنجاح',
  },

  EN: {
    title: 'Order Done Successfully',
    body: 'Your order has beEN done successfully',
  },

  HE: {
    title: 'הזמנה הושלמה בהצלחה',
    body: 'ההזמנה שלך הושלמה בהצלחה',
  },
};

const cancel_order_msg = {
  AR: {
    title: 'تم إلغاء الطلب',
    body: 'تم إلغاء طلبك من قبل الوكيل',
  },

  EN: {
    title: 'Order Canceled',
    body: 'Your order has been canceled by tHE agent',
  },

  HE: {
    title: 'ההזמנה בוטלה',
    body: 'ההזמנה שלך בוטלה על ידי הסוכן',
  },
};
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
    private readonly dataAccessService: DateAccessService,
    private readonly fcmService: FCMService,
    private readonly cityResourceService: CityResourceService
  ) {
    this.model = prismaService.order;
    this.carModelServiceModel = prismaService.carModelService;
    this.takbull = dataAccessService.resources.takbull;
    this.paymentModel = this.prismaService.payment;
    this.customerModel = prismaService.customer;
  }

  async create(customerId: string, lang: HeaderLang, args: CreateOrderDto) {
    const refNumber = Math.floor(Math.random() * 90000000) + 10000000 + '';
    const formattedDate = args.date + 'T00:00:00.000+00:00';

    const availableSlots = await this.cityResourceService.slots({
      cityId: args.cityId,
      date: args.date,
    });
    if (!availableSlots.find((p) => p.value === args.time)) {
      throw new NotFoundException(
        'Time is Not available for selected day, please try anthor time'
      );
    }
    const customer = await this.customerModel.findFirst({
      where: { id: customerId },
      include: { user: true },
    });

    if (!customer) throw new BadRequestException('User not found');

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

    const accessoriesTotalPrice = accessories.reduce(
      (total, acc) => total + acc.price,
      0
    );

    const order = await this.model.create({
      data: {
        ...args,
        date: formattedDate,
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

    const paymentIntent = await this.takbull.PaymentHY({
      lang,
      order: refNumber,
      amount: OrderTotalSum,
      email: customer.user.email,
      phone: customer.user.mobile,
      fullname: customer.user.full_name,
    });
    await this.paymentModel.create({
      data: {
        fees: OrderTotalSum,
        uniq_id: paymentIntent.order as string,
        orderId: order.id,
      },
    });

    return {
      url: paymentIntent,
      success: true,
    };
  }

  async list(
    customerId: string,
    isDone: boolean,
    isPaid: boolean,
    lang: HeaderLang
  ) {
    const orders = await this.model.findMany({
      where: { customerId, paid: isPaid, is_canceled: false, is_done: isDone },
      orderBy: { date: !isDone ? 'asc' : 'desc' },
      select: {
        id: true,
        time: true,
        date: true,
        address: true,
        lat_lng: true,
        note: true,
        tip: true,
        accessories: true,
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
          include: {
            car_service: true,
            service: true,
          },
        },
        car: {
          select: {
            id: true,
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
              select: {
                id: true,
                name_ar: true,
                name_en: true,
                name_he: true,
                image_url: true,
              },
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
        lat_lng: el.lat_lng,
        note: el.note,
        tip: el.tip,
        accessories: el.accessories.map((e) => ({
          id: e.id,
          name: e[`name_${lang}`],
          image_url: e.image_url,
          price: e.price,
        })),
        city: {
          id: el.city.id,
          name: el.city[`name_${lang}`],
        },
        employee: el.employee,
        carModelServiceId: el.service.id,
        fees: el.service.fees,
        service: {
          id: el.service.service.id,
          name: el.service.service[`name_${lang}`],
        },
        car: {
          id: el.car.id,
          brand: {
            image_url: el.car.brand.image_url,
            name: el.car.brand[`name_${lang}`],
            id: el.car.brand.id,
          },
          model: {
            id: el.car.model.id,
            name: el.car.model[`name_${lang}`],
            image_url: el.car.model.image_url,
          },
        },
      })),
    };
  }

  async update(orderId: string, args: UpdateOrderDto, lang: HeaderLang) {
    const order = await this.model.findFirst({
      where: { id: orderId },
      include: {
        customer: { include: { user: true } },
        employee: true,
        service: { include: { service: true } },
        car: { include: { brand: true, model: true } },
        city: true,
      },
    });
    if (!order) throw new BadRequestException('order_not_exist');

    const modelService = await this.carModelServiceModel.findFirst({
      where: { id: args.carModelServiceId },
    });

    if (!modelService) throw new BadRequestException('service_not_exist');

    let bookedSlot: {
      id: string;
      date: string;
      time: string;
      cityId: string;
      orderId: string;
    } | null = null;

    if (args.date) {
      // const formattedDate = format(args.date, 'yyyy-MM-dd');
      bookedSlot = await this.prismaService.bookedSlots.findFirst({
        where: {
          orderId: orderId,
        },
      });
    }

    if (order.fees >= modelService.fees) {
      if (args.time !== order.time) {
        //remove old slot
        bookedSlot &&
          (await this.prismaService.bookedSlots.delete({
            where: { id: bookedSlot.id },
          }));
        // create new slot
        args.date &&
          args.time &&
          (await this.prismaService.bookedSlots.create({
            data: {
              date: args.date,
              time: args.time,
              cityId: args.cityId,
              orderId,
            },
          }));
      }

      const updatedOrder = await this.model.update({
        where: { id: orderId },
        data: { ...args, date: args.date + 'T00:00:00.000+00:00' },
        include: {
          employee: true,
          service: { include: { service: true } },
          car: { include: { brand: true, model: true } },
          city: true,
        },
      });

      await this.prismaService.reminderOrders.deleteMany({
        where: { orderId },
      });

      await this.prismaService.reminderOrders.create({
        data: {
          orderId,
        },
      });

      return {
        success: true,
        url: null,
        results: {
          id: orderId,
          time: updatedOrder.time,
          date: updatedOrder.date,
          address: updatedOrder.address,
          city: {
            id: updatedOrder.city.id,
            name: updatedOrder.city[`name_${lang}`],
          },
          employee: updatedOrder.employee,
          service: {
            id: updatedOrder.service.service.id,
            name: updatedOrder.service.service[`name_${lang}`],
          },
          car: {
            id: updatedOrder.car.id,
            brand: {
              image_url: updatedOrder.car.brand.image_url,
              name: updatedOrder.car.brand[`name_${lang}`],
              id: updatedOrder.car.brand.id,
            },
            model: {
              id: updatedOrder.car.model.id,
              name: updatedOrder.car.model[`name_${lang}`],
            },
          },
        },
      };
    } else {
      const amount = modelService.fees - order.fees;
      const paymentIntent = await this.takbull.PaymentHY({
        lang,
        order: order.ref_number,
        amount,
        email: order.customer.user.email,
        phone: order.customer.user.mobile,
        fullname: order.customer.user.full_name,
        mode: 'update',
      });

      paymentIntent.order &&
        (await this.paymentModel.create({
          data: {
            fees: amount,
            uniq_id: String(paymentIntent.order),
            orderId: order.id,
          },
        }));

      await this.model.update({
        where: { id: orderId },
        data: {
          updatedData: { ...args, date: args.date + 'T00:00:00.000+00:00' },
        },
        include: {
          employee: true,
          service: { include: { service: true } },
          car: { include: { brand: true, model: true } },
          city: true,
        },
      });

      return {
        success: true,
        url: paymentIntent.url,
        results: {
          id: orderId,
          time: order.time,
          date: order.date,
          address: order.address,
          city: {
            id: order.city.id,
            name: order.city[`name_${lang}`],
          },
          employee: order.employee,
          service: {
            id: order.service.service.id,
            name: order.service.service[`name_${lang}`],
          },
          car: {
            id: order.car.id,
            brand: {
              image_url: order.car.brand.image_url,
              name: order.car.brand[`name_${lang}`],
              id: order.car.brand.id,
            },
            model: {
              id: order.car.model.id,
              name: order.car.model[`name_${lang}`],
            },
          },
        },
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
      include: { customer: { include: { user: true } } },
    });

    if (!order) throw new BadGatewayException('order not exist');

    await this.model.update({ where: { id }, data: { is_done: true } });
    await this.prismaService.employee.update({
      where: { id: empId },
      data: {
        total_tips: { increment: order.tip },
        total_orders_money: { increment: order.fees },
      },
    });

    const userLang = order.customer.user.lang;

    this.fcmService.send({
      data: {},
      topic: `user-${order.customer.user.id}`,
      notification: done_order_msg[userLang],
    });

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
      orderBy: { date: 'asc' },
      select: {
        id: true,
        time: true,
        date: true,
        address: true,
        fees: true,
        tip: true,
        note: true,
        accessories: true,
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
            model: {
              select: {
                id: true,
                name_ar: true,
                name_en: true,
                name_he: true,
                image_url: true,
              },
            },
          },
        },
      },
    });

    return order;
  }

  async cancelOrder(id: string, user: Payload, args: CancelOrderDto) {
    const conditions: Prisma.OrderWhereInput = { id };

    if (user.role === 'CUSTOMER') conditions.customerId = user.id;
    else conditions.employeeId = user.id;

    const order = await this.prismaService.order.findFirst({
      where: conditions,
      include: { customer: { include: { user: true } } },
    });

    if (!order) throw new BadRequestException('order_not_exist');

    await this.prismaService.order.update({
      where: { id },
      data: {
        is_canceled: true,
        canceled_note: args.note,
        canceled_by: user.role,
      },
    });

    const userLang = order.customer.user.lang;

    this.fcmService.send({
      data: {},
      topic: `user-${order.customer.user.id}`,
      notification: cancel_order_msg[userLang],
    });

    return { success: true };
  }
}
