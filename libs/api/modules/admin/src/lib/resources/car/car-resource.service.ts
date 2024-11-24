import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AdminCarResourceService {
  private logger = new Logger(AdminCarResourceService.name);
}
