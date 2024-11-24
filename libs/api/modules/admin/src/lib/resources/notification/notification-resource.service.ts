import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class AdminNotificationResourceService {
  private logger = new Logger(AdminNotificationResourceService.name);
}
