import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderResourceService {
  private logger = new Logger(OrderResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.order;
  }

  async create(customerId: number, args: CreateOrderDto) {
    const order = await this.model.create({
      data: {
        ...args,
        ref_number: Math.floor(Math.random() * 90000000) + 10000000 + '',
        customerId,
        type: args.date ? 'ORDER' : 'BOOK_LATER',
      },
    });

    return {
      success: true,
      result: order,
    };
  }

  async list(customerId: number) {
    const orders = await this.model.findMany({ where: { customerId } });

    return { result: orders };
  }
}
