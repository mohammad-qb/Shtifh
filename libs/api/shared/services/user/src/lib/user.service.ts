import { Injectable, Logger } from '@nestjs/common';
import { CryptResourceService } from './resources/crypt/crypt-resource.service';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  resources;

  constructor(private readonly cryptResourceService: CryptResourceService) {
    this.resources = {
      crypt: cryptResourceService,
    };
  }
}
