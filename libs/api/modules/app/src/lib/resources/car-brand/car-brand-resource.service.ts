import { Injectable, Logger } from "@nestjs/common";
import { ListCarBrandsService } from "./services/list/list-car-brands.service";

@Injectable()
export class CarBrandResourceService {
  private logger = new Logger(CarBrandResourceService.name);

  constructor(private readonly listCarBrandsService: ListCarBrandsService) {}

  async list() {
    return await this.listCarBrandsService.listCarBrands();
  }
}
