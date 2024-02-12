import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { ListCarServicesByCityAndCarModel } from './dto/list-by-city-and-car-model.dto';

@Injectable()
export class CarServiceResourceService {
  private logger = new Logger(CarServiceResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = this.prismaService.carService;
  }

  async listByCityAndCarModel(args: ListCarServicesByCityAndCarModel) {
    const result = await this.model.findFirst({
      where: { cityId: args.cityId, carModelId: args.carModelId },
      select: {
        services: {
          select: {
            fees: true,
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
      },
    });

    return { result: result?.services };
  }
}
