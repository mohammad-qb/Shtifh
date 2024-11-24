import { Injectable, Logger } from "@nestjs/common";
import { HeaderLanguage } from "@shtifh/decorators";
import { HttpErrorsService } from "@shtifh/exception-service";
import { PrismaService } from "@shtifh/prisma-service";

@Injectable()
export class DeactivateCarService {
  private logger = new Logger(DeactivateCarService.name);

  constructor(private readonly prismaService: PrismaService, private readonly httpErrorsService: HttpErrorsService) {}

  /**
   * Deactivates a car for a given customer.
   *
   * @param {string} customerId - The ID of the customer who owns the car.
   * @param {string} carId - The ID of the car to be deactivated.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @return {Promise<boolean>} A promise that resolves to `true` if the car was successfully deactivated.
   */
  async deactivate(customerId: string, carId: string, lang: HeaderLanguage) {
    this.logger.log(`Deactivate car ${carId} for customer ${customerId}`);
    const car = await this.prismaService.car.findFirst({where: {id: carId, customerId}});

    if(!car) {
      throw this.httpErrorsService.carNotFound(carId, lang);
    }

    await this.prismaService.car.update({where: {id: carId}, data: {is_active: false}});

    this.logger.log(`Car ${carId} deactivated for customer ${customerId}`);
    return true
  }
}
