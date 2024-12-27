import { Module } from '@nestjs/common';
import { UserModule } from '@shtifh/user-service';
import { ChangePasswordService } from './change-password.service';

@Module({
  imports: [UserModule],
  providers: [ChangePasswordService],
  exports: [ChangePasswordService],
})
export class ChangePasswordModule {}
