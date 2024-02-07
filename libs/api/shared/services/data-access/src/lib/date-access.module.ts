import { Module } from '@nestjs/common';
import { DateAccessService } from './date-access.service';
import { TakbullResourceModule } from './resources/takbull/takbull-resource.module';

@Module({
  imports: [TakbullResourceModule],
  providers: [DateAccessService],
  exports: [DateAccessService],
})
export class DateAccessModule {}
