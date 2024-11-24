import { Module } from '@nestjs/common';
import { ListNotificationsService } from './list-notifications.service';

@Module({
  providers: [ListNotificationsService],
  exports: [ListNotificationsService],
})
export class ListNotificationsModule {}
