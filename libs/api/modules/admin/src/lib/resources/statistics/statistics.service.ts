import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { ListStatisticsDto } from './dto/list-statistics.dto';

@Injectable()
export class StatisticsResourceService {
  private logger = new Logger(StatisticsResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(args: ListStatisticsDto) {
    const { year, month, day } = args;

    const startDate = new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
    let endDate;

    if (day && month && year) {
      endDate = new Date(year, month - 1, day + 1);
    } else if (month && year) {
      endDate = new Date(year, month, 1);
    } else if (year) {
      endDate = new Date(year + 1, 0, 1);
    } else {
      endDate = new Date(9999, 11, 31);
    }

    const where = {
      gte: startDate,
      lte: endDate,
    };

    console.log({ where });

    const [
      customers,
      allCustomers,
      orders,
      completeOrders,
      incompleteOrders,
      money,
      allOrders,
      compAllOrders,
      incompAllOrders,
    ] = await Promise.all([
      this.prismaService.customer.count({
        where: { user: { createdAt: where } },
      }),
      this.prismaService.customer.count(),
      this.prismaService.order.count({
        where: { createdAt: where },
      }),
      this.prismaService.order.count({
        where: { createdAt: where, is_done: true },
      }),
      this.prismaService.order.count({
        where: { createdAt: where, is_done: false },
      }),
      this.prismaService.order.aggregate({
        _sum: {
          fees: true,
          tip: true,
        },
        where: { createdAt: where },
      }),
      this.prismaService.order.count(),
      this.prismaService.order.count({ where: { is_done: true } }),
      this.prismaService.order.count({ where: { is_done: false } }),
    ]).then((data) => data);

    return {
      customers,
      allCustomers,
      orders,
      completeOrders,
      incompleteOrders,
      money: money._sum,
      allOrders,
      compAllOrders,
      incompAllOrders,
    };
  }
}
