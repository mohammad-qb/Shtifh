import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminNotificationResourceService } from './notification-resource.service';

@Resolver()
export class AdminNotificationResourceResolver {
  private logger = new Logger(AdminNotificationResourceResolver.name);

  constructor(
    private readonly adminNotificationResourceService: AdminNotificationResourceService
  ) {}
}
