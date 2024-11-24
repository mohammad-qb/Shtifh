import { Module } from '@nestjs/common';
import { AdminNotificationResourceService } from './notification-resource.service';
import { AdminNotificationResourceResolver } from './notification-resource.resolver';

@Module({
  imports: [],
  providers: [
    AdminNotificationResourceService,
    AdminNotificationResourceResolver,
  ],
  exports: [AdminNotificationResourceResolver],
})
export class AdminNotificationResourceModule {}
