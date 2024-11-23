import { Module } from '@nestjs/common';
import { UserModule } from '@shtifh/user-service';
import { ResetPasswordService } from './reset-password.service';

@Module({
  imports: [UserModule],
  providers: [ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
