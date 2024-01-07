import { Injectable, Logger } from '@nestjs/common';
import { CryptResourceService } from './resources/crypt/crypt-resource.service';
import { JwtResourceService } from './resources/jwt/jwt-resource.service';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  resources;

  constructor(
    private readonly cryptResourceService: CryptResourceService,
    private readonly jwtResourceService: JwtResourceService
  ) {
    this.resources = {
      crypt: cryptResourceService,
      jwt: jwtResourceService,
    };
  }
}
