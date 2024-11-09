import { Module } from "@nestjs/common";
import { EmployeeResourceResolver } from "./employee-resource.resolver";
import { EmployeeResourceService } from "./employee-resource.service";

@Module({
  imports: [EmployeeResourceResolver, EmployeeResourceService],
  providers: [EmployeeResourceResolver, EmployeeResourceService],
  exports: [EmployeeResourceResolver]
})
export class EmployeeResourceModule {}
