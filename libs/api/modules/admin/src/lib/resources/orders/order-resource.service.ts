import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { ListOrdersDto } from './dto/list.dto';
import { Prisma } from '@prisma/client';
import { groupBy } from 'lodash';
import { UpdateOrderDto } from './dto/update.dto';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class OrderResourceService {
  private logger = new Logger(OrderResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.order;
  }

  async list(args: ListOrdersDto) {
    const useDate = new Date(args.date);
    const condition: Prisma.OrderWhereInput = {
      date: {
        gte: startOfDay(useDate),
        lte: endOfDay(useDate),
      },
    };

    // Apply filters based on the provided arguments
    if (args.isCompleted) condition.is_done = true;
    if (args.unCompleted) condition.is_done = false;
    if (args.searchText) {
      condition.customer = {
        user: {
          OR: [
            { full_name: { contains: args.searchText, mode: 'insensitive' } },
            { mobile: { contains: args.searchText, mode: 'insensitive' } },
          ],
        },
      };
    }

    const orders = await this.model.findMany({
      where: condition, // Assuming 'condition' is defined elsewhere
      orderBy: { date: 'desc' },
      include: {
        car: { include: { model: true } },
        city: true,
        accessories: true,
        customer: { include: { user: true } },
        employee: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    // Group orders by their creation date
    const ordersGroupedByDate = groupBy(
      orders,
      (order) => new Date(order.date).toISOString().split('T')[0]
    );

    // For each date, group its orders by city
    const result = Object.entries(ordersGroupedByDate).map(([date, orders]) => {
      // Group orders of the same date by city
      const ordersGroupedByCity = groupBy(orders, 'city.name_he'); // Assuming you want to group by English city name

      // Convert city groups into an array format
      const cities = Object.entries(ordersGroupedByCity).map(
        ([cityName, orders]) => ({
          city: cityName,
          orders: orders,
        })
      );

      return {
        date: date,
        cities: cities,
      };
    });

    return result;
  }

  async update(id: string, args: UpdateOrderDto) {
    const order = await this.model.findFirst({
      where: { id },
    });

    if (!order) throw new Error('No Order exist');

    await this.model.update({ where: { id }, data: args });

    return { success: true };
  }

  async nextUpcoming(customerId: string) {
    const order = await this.prismaService.order.findFirst({
      where: {
        customerId,
        is_done: false,
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

  async customerOrders(customerId: string) {
    const data = await this.prismaService.order.findMany({
      where: { customerId },
      orderBy: { date: 'desc' },
      include: {
        car: { include: { model: true, brand: true } },
        employee: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    return data;
  }
}
