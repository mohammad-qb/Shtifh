import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";
import { UpdateCarInput } from "../../dtos/update-car.dto";
import { HttpErrorsService } from "@shtifh/exception-service";
import { HeaderLanguage } from "@shtifh/decorators";

@Injectable()
export class UpdateCarService {
  private logger = new Logger(UpdateCarService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async updateCar(customerId: string, lang: HeaderLanguage, data: UpdateCarInput) {
    const {carId, ...restArgs} = data;
    this.logger.log(`Update car for customer ${customerId}`);
    const car = await this.prismaService.car.findFirst({where: {id: carId}});

    if(!car || car.customerId !== customerId) throw this.httpErrorsService.carNotFound(carId, lang);

    const updatedCar = await this.prismaService.car.update({
      where: {id: carId},
      data: restArgs
    });

    this.logger.log(`Car updated for customer ${customerId}`);
    return updatedCar;
  }
}