import { Module } from '@nestjs/common';
import { DateAccessService } from './date-access.service';
import { HyPayResourceModule } from './resources/hypay/hypay-resource.module';

@Module({
  imports: [HyPayResourceModule],
  providers: [DateAccessService],
  exports: [DateAccessService],
})
export class DateAccessModule {}
