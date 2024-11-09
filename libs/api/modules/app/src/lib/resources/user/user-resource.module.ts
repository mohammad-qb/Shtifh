import { Module } from "@nestjs/common";
import { UserResourceResolver } from "./user-resource.resolver";
import { UserResourceService } from "./user-resource.service";

@Module({
  imports: [UserResourceResolver, UserResourceService],
  providers: [UserResourceResolver, UserResourceService],
  exports: [UserResourceResolver]
})
export class UserResourceModule {}
