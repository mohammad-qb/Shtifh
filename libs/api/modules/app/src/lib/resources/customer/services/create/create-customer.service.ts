import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCustomerInput } from '../../dtos/create-customer.dto';
import { generateImageUrl } from '../../../../common/helpers/generate-image-url';
import { UserService } from '@shtifh/user-service';

@Injectable()
export class CreateCustomerService {
  private logger = new Logger(CreateCustomerService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService,
    private userService: UserService
  ) {}

  /**
   * Creates a new customer using the provided data.
   *
   * @param {HeaderLanguage} lang - The language header for error messages.
   * @param {CreateCustomerInput} data - The input data for creating the customer.
   * @return {Promise<object>} The created customer object.
   */
  async createCustomer(lang: HeaderLanguage, data: CreateCustomerInput) {
    this.logger.log(`Create customer`, data);
    const { gender, ...userData } = data;
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    const password = await this.userService.resources.crypt.cryptPassword(
      data.password
    );

    if (user) throw this.httpErrorsService.emailAlreadyTaken(data.email, lang);
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
