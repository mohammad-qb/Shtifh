import { Injectable } from "@nestjs/common";

@Injectable()
export class CarOrderResourceService {
  constructor() {}

  async getCarOrderById(id: string) {
    return { id: id, name: "Car 1" };
  }
}
