import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";
import { CreateCarInput } from "../../inputs/create-car.input";

@Injectable()
export class CreateCarService {
  private logger = new Logger(CreateCarService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new car entry for a given customer.
   *
   * @param {string} customerId - The ID of the customer for whom the car is being created.
   * @param {CreateCarInput} data - The data required to create a new car.
   * @return {Promise<Car>} The newly created car object.
   */
  async createCar(customerId: string, data: CreateCarInput) {
    this.logger.log(`Create car for customer ${customerId}`);
    const car = await this.prismaService.car.create({
      data: {...data, customerId}
    });

    this.logger.log(`Car created for customer ${customerId}`);
    return car;
  }
}
