import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AdminListCarsService {
  private logger = new Logger(AdminListCarsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Fetches and lists all cars from the database.
   *
   * This method retrieves all car records using the prisma service's `findMany` method.
   * It logs the process of listing cars and the total number of cars found.
   *
   * @return {Promise<Array>} A promise that resolves to an array of car objects containing the details of each car.
   */
  async listAllCars() {
    this.logger.log('Listing all the cars');
    const cars = await this.prismaService.car.findMany({
      include: {
        brand: true,
        model: true,
        customer: { include: { user: true } },
      },
    });
    this.logger.log(`Found ${cars.length} cars`);
    return cars;
  }
}
