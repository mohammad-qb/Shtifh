import { Injectable, Logger } from '@nestjs/common';
import { CreateCustomerService } from './services/create/create-customer.service';
import { HeaderLanguage } from '@shtifh/decorators';
import { CreateCustomerInput } from './inputs/create-customer.input';
import { UpdateCustomerService } from './services/update/update-customer.service';
import { UpdateCustomerInput } from './inputs/update-customer.input';

@Injectable()
export class CustomerResourceService {
  private logger = new Logger(CustomerResourceService.name);

  constructor(
    private readonly createCustomerService: CreateCustomerService,
    private readonly updateCustomerService: UpdateCustomerService
  ) {}

  async create(lang: HeaderLanguage, input: CreateCustomerInput) {
    await this.createCustomerService.createCustomer(lang, input);
    return true;
  }

  async update(
    userId: string,
    lang: HeaderLanguage,
    input: UpdateCustomerInput
  ) {
    await this.updateCustomerService.updateCustomer(userId, input, lang);
    return true;
  }
}
