import { Injectable, Logger } from '@nestjs/common';
import { CarServiceType } from '@shtifh/helpers';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListCitiesService {
  private logger = new Logger(ListCitiesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Retrieves a list of all cities, performing an aggregation
   * lookup to include related service information from the Service collection.
   *
   * @return {Promise<Array>} A promise that resolves to an array of cities, each
   *                          with embedded service data from the Service collection.
   */
  async listCities() {
    this.logger.log(`List all cities`);
    const services = await this.prismaService.service.findMany({
      where: { type: CarServiceType.PUBLIC, is_active: true },
    });

    const cities = await this.prismaService.city.findMany();

    this.logger.log(`Found ${cities['length']} cities`);
    return cities.map((el) => ({
      ...el,
      car_model_services: el.car_model_services.map((cms) => ({
        ...cms,
        service: services.find((service) => service.id === cms.serviceId),
      })),
    }));
  }
}
