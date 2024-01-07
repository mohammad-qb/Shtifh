import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CryptResourceModule } from './resources/crypt/crypt-resource.module';

@Module({
  imports: [CryptResourceModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
