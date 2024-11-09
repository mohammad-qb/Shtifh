import { Injectable, Logger } from "@nestjs/common";
import { CreateCustomerService } from "./services/create/create-customer.service";
import { HeaderLanguage } from "@shtifh/decorators";
import { CreateCustomerInput } from "./dtos/create-customer.dto";

@Injectable()
export class CustomerResourceService {
  private logger = new Logger(CustomerResourceService.name);

  constructor(private readonly createCustomerService: CreateCustomerService) {}

  async create(lang: HeaderLanguage, input: CreateCustomerInput) {
    await this.createCustomerService.createCustomer(lang, input);
    return true;
  }
}
