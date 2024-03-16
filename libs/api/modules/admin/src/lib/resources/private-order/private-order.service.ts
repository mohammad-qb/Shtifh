import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class PrivateOrderService {
  private logger = new Logger(PrivateOrderService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return await this.prismaService.privateOrder.findMany({
      include: {
        customer: {
          include: {
            user: true,
          },
        },
        employee: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
