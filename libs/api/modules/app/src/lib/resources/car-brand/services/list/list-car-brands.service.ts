import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class ListCarBrandsService {
  private logger = new Logger(ListCarBrandsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listCarBrands(){
    this.logger.log(`List all car brands`);
    const carBrands = await this.prismaService.carBrand.findMany();

    this.logger.log(`Found ${carBrands.length} car brands`);
    return carBrands;
  }
}