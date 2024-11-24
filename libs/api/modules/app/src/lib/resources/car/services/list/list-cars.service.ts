import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class ListCarsService {
  private logger = new Logger(ListCarsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Retrieves a list of active cars owned by a specific customer.
   *
   * @param {string} customerId - The unique identifier of the customer whose cars are being retrieved.
   * @return {Promise<Array>} A promise that resolves to an array of car objects, including their brand and model information.
   */
  async listCars(customerId: string) {
    this.logger.log(`List all cars for customer ${customerId}`);
    const cars = await this.prismaService.car.findMany({
      where: {
        customerId,
        is_active: true
      },
      include: {
        brand: true,
        model: true,
      }
    });

    this.logger.log(`Found ${cars.length} cars for customer ${customerId}`);
    return cars
  }
}
