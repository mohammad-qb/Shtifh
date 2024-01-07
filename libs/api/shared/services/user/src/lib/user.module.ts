import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CryptResourceModule } from './resources/crypt/crypt-resource.module';
import { JwtResourceModule } from './resources/jwt/jwt.resource.module';

@Module({
  imports: [CryptResourceModule, JwtResourceModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
