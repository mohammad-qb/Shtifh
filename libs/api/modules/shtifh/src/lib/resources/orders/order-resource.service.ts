import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DateAccessService } from '@shtifh/date-access-service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderResourceService {
  private logger = new Logger(OrderResourceService.name);
  private model;
  private carModelServiceModel;
  private paymentModel;
  private takbull;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly dataAccessService: DateAccessService
  ) {
    this.model = prismaService.order;
    this.carModelServiceModel = prismaService.carModelService;
    this.takbull = dataAccessService.resources.takbull;
    this.paymentModel = this.prismaService.payment;
  }

  async create(customerId: string, args: CreateOrderDto) {
    const refNumber = Math.floor(Math.random() * 90000000) + 10000000 + '';
    await this.model.create({
      data: {
        ...args,
        ref_number: refNumber,
        customerId,
        type: args.date ? 'ORDER' : 'BOOK_LATER',
      },
    });

    const modelService = await this.carModelServiceModel.findFirst({
      where: { id: args.carModelServiceId },
    });

    const paymentIntent = await this.takbull.paymentIntent({
      order_reference: refNumber,
      OrderTotalSum: modelService?.fees || 0,
    });

    return {
      url: paymentIntent,
      success: true,
    };
  }

  async list(customerId: string) {
    const orders = await this.model.findMany({
      where: { customerId },
      select: {
        id: true,
        city: {
          select: {
            name_ar: true,
            name_en: true,
            name_he: true,
          },
        },
        date: true,
        note: true,
        address: true,
        service: {
          include: {
            service: {
              select: {
                id: true,
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
          },
        },
        car: {
          select: {
            color: true,
            id: true,
            name: true,
          },
        },
      },
    });

    return { results: orders };
  }

  async update(args: UpdateOrderDto) {
    await this.model.update({
      where: { id: args.orderId },
      data: { time: args.time },
    });
  }
}
