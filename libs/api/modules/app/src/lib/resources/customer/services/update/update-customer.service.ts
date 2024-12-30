import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { UpdateCustomerInput } from '../../inputs/update-customer.input';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class UpdateCustomerService {
  private logger = new Logger(UpdateCustomerService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Updates the customer information for the given user ID with the provided data.
   *
   * @param {string} userId - The ID of the user whose information is to be updated.
   * @param {UpdateCustomerInput} data - The new customer information to update.
   * @param {HeaderLanguage} lang - The language header for error messages.
   * @return {Promise<User>} A promise that resolves to the updated user information.
   * @throws {UserNotFoundException} If no user is found with the given ID.
   */
  async updateCustomer(
    userId: string,
    data: UpdateCustomerInput,
    lang: HeaderLanguage
  ) {
    this.logger.log(`Update customer with id ${userId} with id ${data}`);

    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw this.httpErrorsService.userNotFound(userId, lang);

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data,
    });

    this.logger.log(`Update customer with id ${userId} with id ${data}`);
    return updatedUser;
  }
}
