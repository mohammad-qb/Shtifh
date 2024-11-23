import { Module } from '@nestjs/common';
import { UserResourceResolver } from './user-resource.resolver';
import { UserResourceService } from './user-resource.service';
import { AuthModule } from '@shtifh/auth-service';
import { ForgetPasswordModule } from './services/forget-password/forget-password.module';
import { ResetPasswordModule } from './services/reset-password/reset-password.module';
import { VerifyResetPasswordOtpModule } from './services/verify-reset-password-otp/verify-reset-password-otp.module';

@Module({
  imports: [
    AuthModule,
    ForgetPasswordModule,
    ResetPasswordModule,
    VerifyResetPasswordOtpModule,
  ],
  providers: [UserResourceResolver, UserResourceService],
  exports: [UserResourceResolver],
})
export class UserResourceModule {}
