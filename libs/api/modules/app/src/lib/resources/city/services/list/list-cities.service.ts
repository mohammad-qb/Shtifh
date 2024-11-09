import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListCitiesService {
  private logger = new Logger(ListCitiesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listCities() {
    this.logger.log(`List all cities`);
    const cities = await this.prismaService.city.aggregateRaw({
      pipeline: [
        {
          $lookup: {
            from: 'Service',
            localField: 'car_model_service.serviceId',
            foreignField: '_id',
            as: 'service',
          },
        },
      ],
    });

    this.logger.log(`Found ${cities['length']} cities`);
    return cities;
  }
}
