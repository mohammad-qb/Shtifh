import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";
import { CreateCarInput } from "../../dtos/create-car.dto";

@Injectable()
export class CreateCarService {
  private logger = new Logger(CreateCarService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createCar(customerId: string, data: CreateCarInput) {
    this.logger.log(`Create car for customer ${customerId}`);
    const car = await this.prismaService.car.create({
      data: {...data, customerId}
    });

    this.logger.log(`Car created for customer ${customerId}`);
    return car;
  }
}