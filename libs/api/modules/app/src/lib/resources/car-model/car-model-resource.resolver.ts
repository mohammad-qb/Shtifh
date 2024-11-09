import { Query, Resolver } from "@nestjs/graphql";
import { CarModelResourceService } from "./car-model-resource.service";
import { Logger } from "@nestjs/common";
import { ListCarModelsEntity } from "./entities/list-car-models.entity";

@Resolver()
export class CarModelResourceResolver {
  private logger = new Logger(CarModelResourceResolver.name);

  constructor(private readonly carModelResourceService: CarModelResourceService) {}

  @Query(() => [ListCarModelsEntity], { name: "carModels" })
  async listCarModels() {
    return await this.carModelResourceService.list();
  }
}
