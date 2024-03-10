import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { ListOrdersDto } from './dto/list.dto';
import { Prisma } from '@prisma/client';

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

    // Fetch orders with conditions applied
    const orders = await this.model.findMany({
      where: condition,
      include: {
        car: { include: { model: true } },
        city: true,
        customer: { include: { user: true } },
        employee: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    // Group orders by createdAt and then by city
    const groupedByCreatedAt = orders.reduce((acc: any, order) => {
      const date = order.createdAt.toISOString().split('T')[0]; // Group by date (YYYY-MM-DD)
      if (!acc[date]) {
        acc[date] = {};
      }
      const cityName = order.city.name_he;
      if (!acc[date][cityName]) {
        acc[date][cityName] = [];
      }
      acc[date][cityName].push(order);
      return acc;
    }, {});

    return { result: groupedByCreatedAt };
  }
}
