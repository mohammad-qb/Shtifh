import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AdminStatisticsResourceService {
  private logger = new Logger(AdminStatisticsResourceService.name);
}
