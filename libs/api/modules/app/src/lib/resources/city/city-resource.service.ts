import { Injectable, Logger } from '@nestjs/common';
import { ListCitiesService } from './services/list/list-cities.service';
import { ListCityAvailableSlotsInput } from './inputs/list-city-available-slots.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { ListCityAvailableSlotsService } from './services/list-available-slots/list-city-available-slots.service';

@Injectable()
export class CityResourceService {
  private logger = new Logger(CityResourceService.name);

  constructor(
    private readonly listCitiesService: ListCitiesService,
    private readonly listAvailableSlotsService: ListCityAvailableSlotsService
  ) {}

  async list() {
    return await this.listCitiesService.listCities();
  }

  async listAvailableSlots(
    input: ListCityAvailableSlotsInput,
    lang: HeaderLanguage
  ) {
    return await this.listAvailableSlotsService.listAvailableSlots(input, lang);
  }
}
