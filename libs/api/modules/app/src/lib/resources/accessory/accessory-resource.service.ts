import { Injectable, Logger } from "@nestjs/common";
import { ListAccessoriesService } from "./services/list-accessories/list-accessories.service";

@Injectable()
export class AccessoryResourceService {
  private logger = new Logger(AccessoryResourceService.name);
  
  constructor(private readonly listAccessoriesService: ListAccessoriesService) {}

  async list(){
    return await this.listAccessoriesService.listAccessories();
  }
}
