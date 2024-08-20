import { Module } from '@nestjs/common';
import { NotificationResourceController } from './notification.controller';
import { NotificationResourceService } from './notification.service';

@Module({
  imports: [],
  controllers: [NotificationResourceController],
  providers: [NotificationResourceController, NotificationResourceService],
})
export class NotificationResourceModule {}
