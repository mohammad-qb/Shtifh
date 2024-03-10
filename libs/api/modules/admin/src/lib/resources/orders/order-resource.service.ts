import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { ListOrdersDto } from './dto/list.dto';

@Injectable()
export class OrderResourceService {
  private logger = new Logger(OrderResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.order;
  }

  async list(args: ListOrdersDto) {
    const orders = await this.model.findMany({
      include: {
        car: { include: { model: true } },
        city: true,
        customer: { include: { user: true } },
        employee: { include: { user: true } },
        service: { include: { service: true } },
      },
    });
    return { result: orders };
  }
}
