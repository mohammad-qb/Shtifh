import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarServiceDto } from './dto/create-car-service.dto';

@Injectable()
export class CarServiceResourceService {
  private logger = new Logger(CarServiceResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.carService;
  }

  async create(args: CreateCarServiceDto) {
    const createdRecord = await this.model.create({
      data: {
        cityId: args.cityId,
        carModelId: args.carModelId,
        services: {
          createMany: {
            data: args.services,
          },
        },
      },
    });

    return createdRecord;
  }
}
