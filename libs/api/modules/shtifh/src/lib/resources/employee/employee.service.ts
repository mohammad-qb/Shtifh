import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class EmployeeResourceService {
  private logger = new Logger(EmployeeResourceService.name);
  private orderModel;
  private privateOrderModel;

  constructor(private readonly prismaService: PrismaService) {
    this.orderModel = prismaService.order;
    this.privateOrderModel = prismaService.privateOrder;
  }

  async orders(employeeId: string, isDone: boolean) {
    const results = await this.orderModel.findMany({
      where: { employeeId, paid: true, is_done: isDone },
      include: {
        city: true,
        customer: { include: { user: true } },
        car: { include: { model: true } },
        service: { include: { service: true } },
      },
    });

    return { result: results };
  }

  async privateOrders(employeeId: string, isDone: boolean) {
    const results = await this.privateOrderModel.findMany({
      where: { employeeId, is_done: isDone, status: 'CONFIRMED' },
      include: {
        customer: { include: { user: true } },
        private_service: true,
      },
    });

    return { result: results };
  }
}
