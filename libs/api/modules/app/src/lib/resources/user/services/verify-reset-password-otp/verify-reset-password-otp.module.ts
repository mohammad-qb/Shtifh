import { Module } from '@nestjs/common';
import { VerifyResetPasswordOtpService } from './verify-reset-password-otp.service';

@Module({
  providers: [VerifyResetPasswordOtpService],
  exports: [VerifyResetPasswordOtpService],
})
export class VerifyResetPasswordOtpModule {}
