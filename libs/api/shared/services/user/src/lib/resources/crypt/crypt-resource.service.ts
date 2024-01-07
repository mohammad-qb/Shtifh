import { Injectable, Logger } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptResourceService {
  private logger = new Logger(CryptResourceService.name);

  async cryptPassword(password: string) {
    return await hash(password, 10);
  }

  async isPasswordMatch(password: string, cryptPassword: string) {
    return await compare(password, cryptPassword);
  }
}
