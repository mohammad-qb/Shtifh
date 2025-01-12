import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CryptResourceModule } from './resources/crypt/crypt-resource.module';
import { TokenResourceModule } from './resources/token/token-resource.module';

@Global()
@Module({
  imports: [CryptResourceModule, TokenResourceModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
