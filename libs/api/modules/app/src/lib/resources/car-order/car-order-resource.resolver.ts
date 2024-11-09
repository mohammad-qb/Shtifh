import { Resolver } from "@nestjs/graphql";
import { CarOrderResourceService } from "./car-order-resource.service";

@Resolver()
export class CarOrderResourceResolver {
  constructor(private readonly carOrderResourceService: CarOrderResourceService) {}
}
