import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarResourceService {
  private logger = new Logger(CarResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.car;
  }

  async create(customerId: number, args: CreateCarDto) {
    const car = await this.model.create({
      data: {
        ...args,
        customerId,
      },
    });

    return { car };
  }

  async list(customerId: number) {
    const cars = await this.model.findMany({ where: { customerId } });
    return { result: cars };
  }
}
