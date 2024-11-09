import { Injectable, Logger } from "@nestjs/common";
import { ListCitiesService } from "./services/list/list-cities.service";

@Injectable()
export class CityResourceService {
  private logger = new Logger(CityResourceService.name);

  constructor(private readonly listCitiesService: ListCitiesService) {}

  async list() {
    return await this.listCitiesService.listCities();
  }
}
