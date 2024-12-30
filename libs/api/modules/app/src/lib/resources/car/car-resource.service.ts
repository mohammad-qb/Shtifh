import { Injectable, Logger } from "@nestjs/common";
import { CreateCarService } from "./services/create/create-car.service";
import { ListCarsService } from "./services/list/list-cars.service";
import { UpdateCarService } from "./services/update/update-car.service";
import { CreateCarInput } from "./inputs/create-car.input";
import { HeaderLanguage } from "@shtifh/decorators";
import { UpdateCarInput } from "./inputs/update-car.input";
import { DeactivateCarService } from "./services/deactivate/deactivate-car.service";

@Injectable()
export class CarResourceService {
  private logger = new Logger(CarResourceService.name);

  constructor(
    private readonly createCarService: CreateCarService,
    private readonly listCarsService: ListCarsService,
    private readonly updateCarService: UpdateCarService,
    private readonly deactivateCarService: DeactivateCarService
  ) {}

  async create(customerId: string, input: CreateCarInput) {
    await this.createCarService.createCar(customerId, input);
    return true;
  }

  async list(customerId: string) {
    return await this.listCarsService.listCars(customerId);
  }

  async update(customerId: string, lang: HeaderLanguage, input: UpdateCarInput) {
    await this.updateCarService.updateCar(customerId, lang, input);
    return true;
  }

  async deactivate(customerId: string, carId: string, lang: HeaderLanguage) {
    return await this.deactivateCarService.deactivate(customerId, carId, lang);
  }
}
