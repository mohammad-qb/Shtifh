import { Module } from '@nestjs/common';
import { AdminListCarsService } from './list-cars.service';

@Module({
  exports: [AdminListCarsService],
  providers: [AdminListCarsService],
})
export class AdminListCarsModule {}
