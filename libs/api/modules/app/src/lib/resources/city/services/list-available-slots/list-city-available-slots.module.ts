import { Module } from '@nestjs/common';
import { ListCityAvailableSlotsService } from './list-city-available-slots.service';

@Module({
  providers: [ListCityAvailableSlotsService],
  exports: [ListCityAvailableSlotsService],
})
export class ListCityAvailableSlotsModule {}
