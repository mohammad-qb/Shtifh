import { Controller, Logger } from '@nestjs/common';

@Controller('customers')
export class CustomerShtifhController {
  private logger = new Logger(CustomerShtifhController.name);
}
