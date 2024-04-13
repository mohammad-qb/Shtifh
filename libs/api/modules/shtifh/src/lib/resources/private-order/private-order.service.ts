import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreatePrivateOrderDto } from './dto/create-private-order.dto';
import { Payload } from '@shtifh/user-service';

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

  async list(user: Payload) {
    return await this.model.findMany({
      where:
        user.role === 'CUSTOMER'
          ? { customerId: user.id }
          : { employeeId: user.id },
      select: {
        status: true,
        id: true,
        customer: {
          select: { user: { select: { full_name: true, mobile: true } } },
        },
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
}
