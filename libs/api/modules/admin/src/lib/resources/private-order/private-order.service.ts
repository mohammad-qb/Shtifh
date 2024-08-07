import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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
        city: true,
        private_service: true,
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

  async activation(id: string) {
    const data = await this.prismaService.privateOrder.findFirst({
      where: { id },
    });

    if (!data) throw new BadRequestException('not_exist');

    await this.prismaService.privateOrder.update({
      where: { id },
      data: { is_active: data.is_active },
    });

    return { success: true };
  }

  async update(id: string, args: UpdatePrivateOrderDto) {
    const privateOrder = await this.prismaService.privateOrder.findFirst({
      where: { id },
    });

    if (!privateOrder) throw new Error('No Private Order exist');

    await this.prismaService.privateOrder.update({
      where: { id },
      data: { ...args, status: 'CONFIRMED' },
    });

    return { success: true };
  }

  async customer(id: string) {
    return await this.prismaService.privateOrder.findMany({
      orderBy: { date: 'desc' },
      where: { customerId: id },
      include: {
        city: true,
        private_service: true,
        employee: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
