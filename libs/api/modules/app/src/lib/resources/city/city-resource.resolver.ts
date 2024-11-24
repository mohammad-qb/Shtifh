import { Query, Resolver, Args } from '@nestjs/graphql';
import { CityResourceService } from './city-resource.service';
import { Logger } from '@nestjs/common';
import { ListCitiesEntity } from './entities/list-cities.entity';
import { GqlLang, HeaderLanguage } from '@shtifh/decorators';
import { ListCityAvailableSlotsInput } from './inputs/list-city-available-slots.input';

@Resolver()
export class CityResourceResolver {
  private logger = new Logger(CityResourceResolver.name);

  constructor(private readonly CityResourceService: CityResourceService) {}

  @Query(() => [ListCitiesEntity], { name: 'cities' })
  async listCities() {
    return await this.CityResourceService.list();
  }

  @Query(() => [String], { name: 'listCityAvailableSlots' })
  async listCityAvailableSlots(
    @Args('ListCityAvailableSlotsInput') input: ListCityAvailableSlotsInput,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.CityResourceService.listAvailableSlots(input, lang);
  }
}
