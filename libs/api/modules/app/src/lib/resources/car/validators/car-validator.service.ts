import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CarValidatorService {
  private logger = new Logger(CarValidatorService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}


  /**
   * Validates if a car exists for the given car ID and whether it belongs to the specified customer.
   * Throws an error if the car does not exist or does not belong to the specified customer.
   *
   * @param {string} carId - The ID of the car to validate.
   * @param {string} customerId - The ID of the customer to verify ownership.
   * @param {HeaderLanguage} lang - The language preferences for error handling.
   * @return {Promise<Object>} The car object if validation is successful.
   */
  async validateCarById(
    carId: string,
    customerId: string,
    lang: HeaderLanguage
  ) {
    const car = await this.prismaService.car.findUnique({
      where: { id: carId },
    });

    if (!car || car.customerId !== customerId) {
      throw this.httpErrorsService.carNotFound(carId, lang);
    }

    return car;
  }
}
