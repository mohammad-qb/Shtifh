import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { ChangeVisibilityDto } from './dto/change.dto';
import { ChangeManyVisibilityDto } from './dto/change-many-visibility.dto';

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
        car_model_services: {
          createMany: {
            data: args.services,
          },
        },
      },
    });

    return createdRecord;
  }

  async addService() {}

  async changeVisibility(args: ChangeVisibilityDto) {
    const carService = await this.model.update({
      where: { id: args.carServiceId },
      data: { active: args.active },
    });

    if (!carService) throw new BadRequestException('Car service not exist');

    return { success: true };
  }
  async changeCityVisibility(args: ChangeManyVisibilityDto) {
    const carService = await this.model.updateMany({
      where: { cityId: args.cityId },
      data: { active: args.active },
    });

    if (!carService) throw new BadRequestException('Car service not exist');

    return { success: true };
  }
}
