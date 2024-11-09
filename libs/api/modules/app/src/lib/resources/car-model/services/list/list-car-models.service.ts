import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class ListCarModelsService {
  private logger = new Logger(ListCarModelsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listCarModels() {
    this.logger.log(`List all car models`);
    const carModels = await this.prismaService.carModel.findMany();

    this.logger.log(`Found ${carModels.length} car models`);
    return carModels;  
  }
}