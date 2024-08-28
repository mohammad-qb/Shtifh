import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreatePrivateOrderDto } from './dto/create-private-order.dto';
import { Payload } from '@shtifh/user-service';
import { HeaderLang } from '@shtifh/decorators';

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
        cityId: args.cityId,
        carId: args.carId,
        address: args.address,
        note: args.note,
        customerId,
        lat_lng: args.lat_lng,
      },
      select: {
        status: true,
        id: true,
        note: true,
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

  async list(user: Payload, lang: HeaderLang) {
    const orders = await this.model.findMany({
      where:
        user.role === 'CUSTOMER'
          ? { customerId: user.id }
          : { employeeId: user.id },
      select: {
        status: true,
        id: true,
        time: true,
        date: true,
        price: true,
        note: true,
        address: true,
        employee: {
          select: {
            user: {
              select: {
                full_name: true,
              },
            },
          },
        },
        city: { select: { name_ar: true, name_en: true, name_he: true } },
        car: {
          select: {
            brand: {
              select: {
                image_url: true,
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
            model: { select: { id: true, name_ar: true, name_en: true, name_he: true, image_url: true } },
          },
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

    return orders.map((el) => ({
      status: el.status,
      id: el.id,
      time: el.time,
      date: el.date,
      address: el.address,
      price: el.price,
      note: el.note,
      employee: el.employee,
      city: el.city[`name_${lang}`],
      private_service: {
        id: el.private_service.id,
        createdAt: el.private_service.createdAt,
        name: el.private_service[`name_${lang}`],
      },
      car: {
        brand: {
          image_url: el.car.brand.image_url,
          name: el.car.brand[`name_${lang}`],
        },
        model: {
          id: el.car.model.id,
          name: el.car.model[`name_${lang}`],
          image_url: el.car.model.image_url,
        },
      },
    }));
  }

  async done(id: string, empId: string) {
    const privateOrder = await this.model.findFirst({
      where: { id, employeeId: empId },
    });

    if (!privateOrder) throw new BadGatewayException('Private order not exist');

    await this.model.update({ where: { id }, data: { is_done: true , status: 'DONE'} });

    return { success: true };
  }

  async nextUpcoming(customerId: string) {
    const privateOrder = await this.prismaService.privateOrder.findFirst({
      where: {
        customerId,
        is_done: false,
        status: 'CONFIRMED',
        date: {
          gt: new Date().toISOString(),
        },
      },
      orderBy: { date: 'desc' },
      include: {
        city: true,
        car: { include: { brand: true, model: true } },
        employee: { include: { user: true } },
        private_service: true,
      },
    });

    return privateOrder;
  }
}
