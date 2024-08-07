import { Module } from '@nestjs/common';
import { NotificationResourceController } from './notification.controller';
import { NotificationResourceService } from './notification.service';
import { FcmModule } from '@shtifh/fcm-service';
@Module({
  imports: [FcmModule],
  controllers: [NotificationResourceController],
  providers: [NotificationResourceController, NotificationResourceService],
})
export class NotificationResourceModule {}
