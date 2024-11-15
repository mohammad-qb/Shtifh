import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CarOrderResourceService {
  private logger = new Logger(CarOrderResourceService.name);

  constructor(){}
}
