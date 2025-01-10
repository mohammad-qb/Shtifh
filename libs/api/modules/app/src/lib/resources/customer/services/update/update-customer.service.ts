import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { UpdateCustomerInput } from '../../inputs/update-customer.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { CustomerValidatorService } from '../../validators/customer-validator.service';

@Injectable()
export class UpdateCustomerService {
  private logger = new Logger(UpdateCustomerService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly customerValidatorService: CustomerValidatorService
  ) {}

  /**
   * Updates the customer information for the specified user ID.
   *
   * @param {string} userId - The unique identifier of the user whose customer information needs to be updated.
   * @param {UpdateCustomerInput} data - An object containing the updated customer information.
   * @param {HeaderLanguage} lang - The language preference for processing the request.
   * @return {Promise<object>} A promise that resolves to the updated customer information.
   */
  async updateCustomer(
    userId: string,
    data: UpdateCustomerInput,
    lang: HeaderLanguage
  ): Promise<object> {
    this.logger.log(`Update customer with id ${userId} with id ${data}`);

    await this.customerValidatorService.validateCustomerByUserId(userId, lang);
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data,
    });

    this.logger.log(`Update customer with id ${userId} with id ${data}`);
    return updatedUser;
  }
}
