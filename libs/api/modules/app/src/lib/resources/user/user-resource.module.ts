import { Module } from "@nestjs/common";
import { UserResourceResolver } from "./user-resource.resolver";
import { UserResourceService } from "./user-resource.service";
import { AuthModule } from "@shtifh/auth-service";

@Module({
  imports: [AuthModule],
  providers: [UserResourceResolver, UserResourceService],
  exports: [UserResourceResolver]
})
export class UserResourceModule {}
