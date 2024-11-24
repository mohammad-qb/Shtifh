import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AdminCustomerResourceService {
  private logger = new Logger(AdminCustomerResourceService.name);
}
