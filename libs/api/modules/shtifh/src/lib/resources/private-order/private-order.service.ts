import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreatePrivateOrderDto } from './dto/create-private-order.dto';

@Injectable()
export class PrivateOrderService {
  private logger = new Logger(PrivateOrderService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.privateOrder;
  }

  async create(customerId: string, args: CreatePrivateOrderDto) {
    return await this.model.create({
      data: {
        privateServiceId: args.private_service_id,
        customerId,
      },
      select: {
        status: true,
        id: true,
        private_service: {
          select: {
            id: true,
            name_ar: true,
            name_en: true,
            name_he: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async list(customerId: string) {
    return await this.model.findMany({
      where: { customerId },
      select: {
        status: true,
        id: true,
        private_service: {
          select: {
            id: true,
            name_ar: true,
            name_en: true,
            name_he: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async done(id: string, empId: string) {
    const privateOrder = await this.model.findFirst({
      where: { id, employeeId: empId },
    });

    if (!privateOrder) throw new BadGatewayException('Private order not exist');

    await this.model.update({ where: { id }, data: { is_done: true } });

    return { success: true };
  }
}
