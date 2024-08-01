import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CustomerResourceService {
  private logger = new Logger(CustomerResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.customer;
  }

  async list() {
    const customers = await this.model.findMany({
      include: { user: true, cars: { include: { model: true, brand: true } } },
    });

    return { result: customers };
  }

  async switchBlock(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException('user_wrong');

    await this.prismaService.user.update({
      where: { id: userId },
      data: { is_blocked: !user.is_blocked },
    });
  }

  async orders(customerId: string) {
    const results = await this.prismaService.order.findMany({
      where: { customerId },
      include: {
        city: true,
        car: { include: { brand: true, model: true } },
        service: { include: { service: true } },
      },
      orderBy: { date: 'desc' },
    });

    return { results };
  }

  async privateOrders(customerId: string) {
    const results = await this.prismaService.privateOrder.findMany({
      where: { customerId },
      include: {
        city: true,
        car: { include: { brand: true, model: true } },
        private_service: true,
      },
      orderBy: { date: 'desc' },
    });

    return { results };
  }
}
