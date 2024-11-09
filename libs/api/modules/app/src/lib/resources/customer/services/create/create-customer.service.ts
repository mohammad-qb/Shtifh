import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCustomerInput } from '../../dtos/create-customer.dto';
import { generateImageUrl } from '../../../../common/helpers/generate-image-url';

@Injectable()
export class CreateCustomerService {
  private logger = new Logger(CreateCustomerService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  async createCustomer(lang: HeaderLanguage, data: CreateCustomerInput) {
    this.logger.log(`Create customer`, data);
    const { gender, ...userData } = data;
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (user) throw this.httpErrorsService.emailAlreadyTaken(data.email, lang);
    const customer = await this.prismaService.customer.create({
      data: {
        gender,
        image_url: generateImageUrl(gender, data.full_name),
        user: {
          create: {
            ...userData,
          },
        },
      },
    });
    this.logger.log(`Customer created`, customer);
    return customer;
  }
}
