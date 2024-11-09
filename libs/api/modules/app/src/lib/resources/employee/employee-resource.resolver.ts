import { Resolver } from "@nestjs/graphql";
import { EmployeeResourceService } from "./employee-resource.service";

@Resolver()
export class EmployeeResourceResolver {
  constructor(private readonly EmployeeResourceService: EmployeeResourceService) {}
}
