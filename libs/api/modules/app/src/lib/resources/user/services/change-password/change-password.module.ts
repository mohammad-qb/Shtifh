import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';

@Module({
  providers: [ChangePasswordService],
  exports: [ChangePasswordService],
})
export class ChangePasswordModule {}
