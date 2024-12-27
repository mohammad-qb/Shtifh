import { Logger } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { ServicesResourceService } from "./services-resource.service";
import { ServiceEntity } from "@shtifh/entities";

@Resolver()
export class ServicesResourceResolver {
  private logger = new Logger(ServicesResourceResolver.name);

  constructor(private readonly servicesResourceService: ServicesResourceService) {}

  @Query(() => [ServiceEntity], { name: "listPrivateServices" })
  async listPrivateServices() {
    return this.servicesResourceService.listPrivateServices();
  }
}
