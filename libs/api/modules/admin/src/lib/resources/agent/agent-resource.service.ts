import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AdminAgentResourceService {
  private logger = new Logger(AdminAgentResourceService.name);
}
