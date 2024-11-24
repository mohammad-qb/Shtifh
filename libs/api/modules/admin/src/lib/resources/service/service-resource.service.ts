import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AdminServiceResourceService {
  private logger = new Logger(AdminServiceResourceService.name);
}
