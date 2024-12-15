import { Injectable, Logger } from '@nestjs/common';
import { AdminListCarsService } from './services/list/list-cars.service';

@Injectable()
export class AdminCarResourceService {
  private logger = new Logger(AdminCarResourceService.name);

  constructor(private readonly listCarsService: AdminListCarsService) {}

  async list() {
    return await this.listCarsService.listAllCars();
  }
}
