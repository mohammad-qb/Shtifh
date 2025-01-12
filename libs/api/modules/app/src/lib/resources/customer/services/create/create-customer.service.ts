import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCustomerInput } from '../../inputs/create-customer.input';
import { UserService } from '@shtifh/user-service';
import { generateImageUrl } from '@shtifh/helpers';
import { CustomerValidatorService } from '../../validators/customer-validator.service';

@Injectable()
export class CreateCustomerService {
  private logger = new Logger(CreateCustomerService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly customerValidatorService: CustomerValidatorService,
    private userService: UserService
  ) {}

  /**
   * Creates a new customer along with their associated user account.
   *
   * @param {HeaderLanguage} lang - The language header for validations and error messages.
   * @param {CreateCustomerInput} data - The input object containing customer information, including email, password, and other user data.
   * @return {Promise<object>} A promise that resolves to the created customer object.
   */
  async createCustomer(
    lang: HeaderLanguage,
    data: CreateCustomerInput
  ): Promise<object> {
    this.logger.log(`Create customer`, data);
    const { gender, ...userData } = data;

    await this.customerValidatorService.validateCustomerEmailUniqueness(
      data.email,
      lang
    );

    const password = await this.userService.cryptPassword(data.password);
    const customer = await this.prismaService.customer.create({
      data: {
        gender,
        image_url: generateImageUrl(gender, data.full_name),
        user: {
          create: {
            ...userData,
            password,
          },
        },
      },
    });
    this.logger.log(`Customer created`, customer);
    return customer;
  }
}
