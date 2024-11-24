import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class ListAccessoriesService {
  private logger = new Logger(ListAccessoriesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Lists all accessories.
   *
   * This method retrieves all accessory records from the database and returns them.
   *
   * @return {Promise<Array>} A promise that resolves to an array of accessory objects.
   */
  async listAccessories() {
    this.logger.log(`List all accessories`);
    const accessories = await this.prismaService.accessory.findMany();

    this.logger.log(`Found ${accessories.length} accessories`);
    return accessories;
  }
}
