import { Injectable, Logger } from '@nestjs/common';
import { CryptResourceService } from './resources/crypt/crypt-resource.service';
import { TokenResourceService } from './resources/token/token-resource.service';
import { UserPayload } from './resources/token/types/user-token.type';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  isPasswordMatch;
  cryptPassword;
  generateToken;
  verifyToken;

  constructor(
    private readonly cryptResourceService: CryptResourceService,
    private readonly tokenResourceService: TokenResourceService
  ) {
    this.isPasswordMatch = (password: string, cPassword: string) =>
      cryptResourceService.isPasswordMatch(password, cPassword);
    this.cryptPassword = (password: string) =>
      cryptResourceService.cryptPassword(password);
    this.generateToken = (payload: UserPayload) =>
      tokenResourceService.generate(payload);
    this.verifyToken = (token: string) => tokenResourceService.verify(token);
  }
}
