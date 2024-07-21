import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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
        car: { include: { model: true, brand: true } },
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
}
