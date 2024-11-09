import { Resolver } from "@nestjs/graphql";
import { UserResourceService } from "./user-resource.service";

@Resolver()
export class UserResourceResolver {
  constructor(private readonly UserResourceService: UserResourceService) {}
}
