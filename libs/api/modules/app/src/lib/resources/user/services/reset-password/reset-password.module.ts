import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Module({
  providers: [ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
