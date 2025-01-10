import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UpdateCarInput } from '../../inputs/update-car.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { CarValidatorService } from '../../validators/car-validator.service';

@Injectable()
export class UpdateCarService {
  private logger = new Logger(UpdateCarService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly carValidatorService: CarValidatorService
  ) {}


  /**
   * Updates the details of a car associated with a specific customer.
   *
   * @param {string} customerId - The unique identifier of the customer.
   * @param {HeaderLanguage} lang - The language preference for validation messages.
   * @param {UpdateCarInput} data - The input data containing car details for the update.
   * @return {Promise<object>} A promise that resolves to the details of the updated car.
   */
  async updateCar(
    customerId: string,
    lang: HeaderLanguage,
    data: UpdateCarInput
  ) {
    const { carId, ...restArgs } = data;
    this.logger.log(`Update car for customer ${customerId}`);

    await this.carValidatorService.validateCarById(carId, customerId, lang);

    const updatedCar = await this.prismaService.car.update({
      where: { id: carId },
      data: restArgs,
    });

    this.logger.log(`Car updated for customer ${customerId}`);
    return updatedCar;
  }
}
