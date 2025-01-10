import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { CarValidatorService } from '../../validators/car-validator.service';

@Injectable()
export class DeactivateCarService {
  private logger = new Logger(DeactivateCarService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly carValidatorService: CarValidatorService
  ) {}


  /**
   * Deactivates a car for a specified customer.
   *
   * @param {string} customerId - The ID of the customer owning the car.
   * @param {string} carId - The ID of the car to be deactivated.
   * @param {HeaderLanguage} lang - The language preference for any validation messages or logs.
   * @returns {Promise<boolean>} A promise that resolves to true when the car is successfully deactivated.
   */
  async deactivate(customerId: string, carId: string, lang: HeaderLanguage) {
    this.logger.log(`Deactivate car ${carId} for customer ${customerId}`);

    await this.carValidatorService.validateCarById(carId, customerId, lang);

    await this.prismaService.car.update({
      where: { id: carId },
      data: { is_active: false },
    });

    this.logger.log(`Car ${carId} deactivated for customer ${customerId}`);
    return true;
  }
}
