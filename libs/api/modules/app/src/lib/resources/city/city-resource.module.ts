import { Module } from '@nestjs/common';
import { CityResourceResolver } from './city-resource.resolver';
import { CityResourceService } from './city-resource.service';
import { ListCitiesModule } from './services/list/list-cities.module';
import { ListCityAvailableSlotsModule } from './services/list-available-slots/list-city-available-slots.module';

@Module({
  imports: [ListCitiesModule, ListCityAvailableSlotsModule],
  providers: [CityResourceResolver, CityResourceService],
  exports: [CityResourceResolver],
})
export class CityResourceModule {}
