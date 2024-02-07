import { Injectable, Logger } from '@nestjs/common';
import { TakbullResourceService } from './resources/takbull/takbull-resource.service';

@Injectable()
export class DateAccessService {
  private logger = new Logger(DateAccessService.name);
  resources;

  constructor(private readonly takbullResourceService: TakbullResourceService) {
    this.resources = {
      takbull: this.takbullResourceService,
    };
  }
}
