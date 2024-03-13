import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { ListOrdersDto } from './dto/list.dto';
import { Prisma } from '@prisma/client';
import { groupBy } from 'lodash';

@Injectable()
export class OrderResourceService {
  private logger = new Logger(OrderResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.order;
  }

  async list(args: ListOrdersDto) {
    const condition: Prisma.OrderWhereInput = {};

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
      include: {
        car: { include: { model: true } },
        city: true,
        customer: { include: { user: true } },
        employee: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    // Group orders by their creation date
    const ordersGroupedByDate = groupBy(
      orders,
      (order) => order.createdAt.toISOString().split('T')[0]
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
}
