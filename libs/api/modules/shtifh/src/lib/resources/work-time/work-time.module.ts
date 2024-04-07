import { Module } from '@nestjs/common';
import { WorkTimeController } from './work-time.controller';
import { WorkTimeService } from './work-time.service';

@Module({
  controllers: [WorkTimeController],
  providers: [WorkTimeController, WorkTimeService],
  exports: [WorkTimeController, WorkTimeService],
})
export class WorkTimeModule {}
