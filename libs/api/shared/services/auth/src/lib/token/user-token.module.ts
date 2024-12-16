import { Module } from '@nestjs/common';
import { JwtModule } from '@shtifh/jwt-service';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [JwtModule],
  providers: [UserTokenService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
