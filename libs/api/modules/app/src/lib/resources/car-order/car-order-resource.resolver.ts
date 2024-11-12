import { Query, Resolver } from "@nestjs/graphql";
import { CarOrderResourceService } from "./car-order-resource.service";
import { Logger } from "@nestjs/common";

@Resolver()
export class CarOrderResourceResolver {
  private logger = new Logger(CarOrderResourceResolver.name);

  constructor(private readonly carOrderResourceService: CarOrderResourceService) {}

  @Query(() => [ListCarOrdersEntity], { name: "carOrders" })
  async listCarOrders() {
    return await this.carOrderResourceService.list();
  }
}
