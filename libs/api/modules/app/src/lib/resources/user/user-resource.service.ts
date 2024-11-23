import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '@shtifh/auth-service';
import { LoginInput } from './inputs/login.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { ForgetPasswordService } from './services/forget-password/forget-password.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { VerifyResetPasswordOtpService } from './services/verify-reset-password-otp/verify-reset-password-otp.service';
import { VerifyResetPasswordOtpInput } from './inputs/verify-reset-password-otp.input';

@Injectable()
export class UserResourceService {
  private logger = new Logger(UserResourceService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly verifyResetPasswordOtpService: VerifyResetPasswordOtpService
  ) {}

  async login(input: LoginInput, lang: HeaderLanguage) {
    return await this.authService.login(input.email, input.password, lang);
  }

  async me(userId: string, lang: HeaderLanguage) {
    return await this.authService.me(userId, lang);
  }

  async forgetPassword(email: string, lang: HeaderLanguage) {
    return await this.forgetPasswordService.forgetPassword(email, lang);
  }

  async resetPassword(input: ResetPasswordInput, lang: HeaderLanguage) {
    await this.resetPasswordService.resetPassword(input, lang);
    return true;
  }

  async verifyResetPasswordOtp(
    input: VerifyResetPasswordOtpInput,
    lang: HeaderLanguage
  ) {
    await this.verifyResetPasswordOtpService.verifyResetPasswordOtp(
      input,
      lang
    );
    return true;
  }
}
