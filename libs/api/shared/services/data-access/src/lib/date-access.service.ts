import { Injectable, Logger } from '@nestjs/common';
import { HyPayResourceService } from './resources/hypay/hypay-resource.service';

@Injectable()
export class DateAccessService {
  private logger = new Logger(DateAccessService.name);
  resources;

  constructor(private readonly hyPayResourceService: HyPayResourceService) {
    this.resources = {
      hyPay: this.hyPayResourceService,
    };
  }
}
