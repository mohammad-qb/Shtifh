import { Injectable, Logger } from '@nestjs/common';
import { ListPrivateServicesService } from './services/list-private-services/list-private-services.service';

@Injectable()
export class ServicesResourceService {
  private logger = new Logger(ServicesResourceService.name);

  constructor(private listPrivateServicesService: ListPrivateServicesService) {}

  async listPrivateServices() {
    return this.listPrivateServicesService.listPrivateServices();
  }
}
