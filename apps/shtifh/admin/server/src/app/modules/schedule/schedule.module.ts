import { Module } from '@nestjs/common';
import { ScheduleResourceController } from './schedule.controller';
import { ScheduleResourceService } from './schedule.service';
import { PrismaModule } from '@shtifh/prisma-service';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleResourceController],
  providers: [ScheduleResourceController, ScheduleResourceService],
  exports: [ScheduleResourceController, ScheduleResourceService],
})
export class ScheduleResourceModule {}
