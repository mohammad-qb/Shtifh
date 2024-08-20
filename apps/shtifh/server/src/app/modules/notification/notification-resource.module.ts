import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { NotificationResourceController } from './notification-resource.controller';
import { NotificationResourceService } from './notification-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [NotificationResourceController],
  providers: [NotificationResourceController, NotificationResourceService],
  exports: [NotificationResourceController, NotificationResourceService],
})
export class NotificationResourceModule {}
