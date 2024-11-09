import { Injectable } from "@nestjs/common";

@Injectable()
export class EmployeeResourceService {
  constructor() {}

  async getEmployeeById(id: string) {
    return { id: id, name: "Employee 1" };
  }
}
