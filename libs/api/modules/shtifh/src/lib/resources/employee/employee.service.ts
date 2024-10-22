import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from '@shtifh/prisma-service';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

@Injectable()
export class EmployeeResourceService {
  private logger = new Logger(EmployeeResourceService.name);
  private orderModel;
  private privateOrderModel;

  constructor(private readonly prismaService: PrismaService) {
    this.orderModel = prismaService.order;
    this.privateOrderModel = prismaService.privateOrder;
  }

  async UpcomingOrders(employeeId: string, date?: string) {
    const useDate = date ? new Date(date) : new Date();
    console.log(
      {
        date: {
          gte: startOfDay(useDate),
          lt: endOfDay(useDate),
        },
      },
      employeeId
    );
    const results = await this.orderModel.findMany({
      where: {
        employeeId,
        paid: true,
        is_done: false,
        is_canceled: false,
        date: {
          gte: startOfDay(useDate),
          lt: endOfDay(useDate),
        },
      },
      include: {
        city: true,
        customer: { include: { user: true } },
        car: { include: { model: true, brand: true } },
        service: { include: { service: true } },
        accessories: true,
      },
      orderBy: { date: 'asc' },
    });
    console.log(results);

    return { results };
  }

  async UpcomingPrivateOrders(employeeId: string, date?: string) {
    const useDate = date ? new Date(date) : new Date();

    const results = await this.privateOrderModel.findMany({
      where: {
        employeeId,
        status: 'CONFIRMED',
        is_done: false,
        date: {
          gte: startOfDay(useDate),
          lt: endOfDay(useDate),
        },
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        customer: { include: { user: true } },
        private_service: true,
        city: true,
        car: { include: { model: true, brand: true } },
      },
    });
    console.log(results);

    return { results };
  }

  async orders(employeeId: string, isDone: boolean) {
    const results = await this.orderModel.findMany({
      where: { employeeId, paid: true, OR: [ {is_done: true}, {is_canceled: true} ] },
      include: {
        city: true,
        customer: { include: { user: true } },
        car: { include: { model: true, brand: true } },
        service: { include: { service: true } },
        accessories: true,
      },
    });

    return { result: results };
  }

  async privateOrders(employeeId: string, status: $Enums.OrderStatus) {
    const results = await this.privateOrderModel.findMany({
      where: { employeeId, status: {in: ['DONE', 'DECLINED']}, },
      include: {
        customer: { include: { user: true } },
        private_service: true,
        city: true,
        car: { include: { model: true, brand: true } },
      },
    });

    return { result: results };
  }

  async statistics(employeeId: string) {
    const result = await this.prismaService.employee.findFirst({
      where: { id: employeeId },
      select: { total_orders_money: true, total_tips: true },
    });

    if (!result) throw new BadRequestException('user_wrong');

    return result;
  }

  async wallet(employeeId: string) {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());

    const promises = [
      //PRIVATE ORDERS
      this.prismaService.privateOrder.findMany({
        where: {
          employeeId,
          status: 'DONE',
          date: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      }),
      this.prismaService.privateOrder.count({
        where: {
          employeeId,
          status: 'DONE',
        },
      }),
      this.prismaService.privateOrder.findMany({
        where: {
          employeeId,
          status: 'DONE',
          date: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
      }),
      this.prismaService.privateOrder.findMany({
        where: {
          employeeId,
          status: 'DONE',
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
      //ORDERS
      this.prismaService.order.findMany({
        where: {
          employeeId,
          is_done: true,
          paid: true,
          date: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      }),
      this.prismaService.order.count({
        where: {
          employeeId,
          is_done: true,
          paid: true,
        },
      }),
      this.prismaService.order.findMany({
        where: {
          employeeId,
          is_done: true,
          paid: true,
          date: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
      }),
      this.prismaService.order.findMany({
        where: {
          employeeId,
          is_done: true,
          paid: true,
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ];

    const [
      privateOrdersToday,
      privateOrdersCount,
      privateOrderWeek,
      privateOrdersMonth,
      ordersToday,
      ordersCount,
      ordersWeek,
      ordersMonth,
    ] = await Promise.all(promises);

    const totalPrivateOrdersCostToday = (
      privateOrdersToday as { price: number }[]
    ).reduce((total, order) => total + order.price, 0);

    const totalPrivateOrdersCostThisWeek = (
      privateOrderWeek as { price: number }[]
    ).reduce((total, order) => total + order.price, 0);

    const totalPrivateOrdersCostThisMonth = (
      privateOrdersMonth as { price: number }[]
    ).reduce((total, order) => total + order.price, 0);

    const totalOrdersCostToday = (ordersToday as { fees: number }[]).reduce(
      (total, order) => total + order.fees,
      0
    );
    const totalOrdersCostThisWeek = (ordersWeek as { fees: number }[]).reduce(
      (total, order) => total + order.fees,
      0
    );
    const totalOrdersCostThisMonth = (ordersMonth as { fees: number }[]).reduce(
      (total, order) => total + order.fees,
      0
    );

    return {
      totalCount: (privateOrdersCount as number) + (ordersCount as number),
      today: {
        totalOrders:
          (privateOrdersToday as []).length + (ordersToday as []).length,
        totalCost: totalPrivateOrdersCostToday + totalOrdersCostToday,
      },
      thisWeek: {
        totalOrders:
          (privateOrderWeek as []).length + (ordersWeek as []).length,
        totalCost: totalPrivateOrdersCostThisWeek + totalOrdersCostThisWeek,
      },
      thisMonth: {
        totalOrders:
          (privateOrdersMonth as []).length + (ordersMonth as []).length,
        totalCost: totalPrivateOrdersCostThisMonth + totalOrdersCostThisMonth,
      },
    };
  }
}
