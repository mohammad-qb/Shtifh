import { Injectable, Logger } from "@nestjs/common";
import { ListCarModelsService } from "./services/list/list-car-models.service";

@Injectable()
export class CarModelResourceService {
  private logger =  new Logger(CarModelResourceService.name);

  constructor(private readonly listCarModelsService: ListCarModelsService) {}

  async list() {
    return await this.listCarModelsService.listCarModels();
  }
}
