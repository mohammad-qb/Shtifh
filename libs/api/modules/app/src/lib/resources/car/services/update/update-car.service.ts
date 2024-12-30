import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";
import { UpdateCarInput } from "../../inputs/update-car.input";
import { HttpErrorsService } from "@shtifh/exception-service";
import { HeaderLanguage } from "@shtifh/decorators";

@Injectable()
export class UpdateCarService {
  private logger = new Logger(UpdateCarService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Updates the details of a car owned by a specific customer.
   *
   * @param {string} customerId - The ID of the customer who owns the car.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @param {UpdateCarInput} data - The data containing the car ID and fields to be updated.
   * @return {Promise<Object>} The updated car object.
   * @throws Will throw an error if the car is not found or does not belong to the specified customer.
   */
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
