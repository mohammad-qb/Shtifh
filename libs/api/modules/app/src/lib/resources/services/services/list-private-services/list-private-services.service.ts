import { Injectable, Logger } from "@nestjs/common";
import { CarServiceType } from "@shtifh/helpers";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class ListPrivateServicesService {
  private logger = new Logger(ListPrivateServicesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async listPrivateServices() {
    this.logger.log("List private services");
    const privateServices = await this.prismaService.service.findMany({
      where: {
        type: CarServiceType.PRIVATE
      },
    });

    this.logger.log(`Found ${privateServices.length} private services`);
    return privateServices;
  }
}
