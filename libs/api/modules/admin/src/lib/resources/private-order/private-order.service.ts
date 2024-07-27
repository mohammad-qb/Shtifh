import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UpdatePrivateOrderDto } from './dto/update.dto';

@Injectable()
export class PrivateOrderService {
  private logger = new Logger(PrivateOrderService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return await this.prismaService.privateOrder.findMany({
      orderBy: { createdAt: 'desc' },
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

  async update(id: string, args: UpdatePrivateOrderDto) {
    const privateOrder = await this.prismaService.privateOrder.findFirst({
      where: { id },
    });

    if (!privateOrder) throw new Error('No Private Order exist');

    await this.prismaService.privateOrder.update({ where: { id }, data: args });

    return { success: true };
  }
}
