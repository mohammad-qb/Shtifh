import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '@shtifh/auth-service';
import { LoginInput } from './inputs/login.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { ForgetPasswordService } from './services/forget-password/forget-password.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { VerifyResetPasswordOtpService } from './services/verify-reset-password-otp/verify-reset-password-otp.service';
import { VerifyResetPasswordOtpInput } from './inputs/verify-reset-password-otp.input';
import { ChangePasswordService } from './services/change-password/change-password.service';
import { ChangePasswordInput } from './inputs/change-password.input';

@Injectable()
export class UserResourceService {
  private logger = new Logger(UserResourceService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly verifyResetPasswordOtpService: VerifyResetPasswordOtpService,
    private readonly changePasswordService: ChangePasswordService
  ) {}

  async login(input: LoginInput, lang: HeaderLanguage) {
    const { user, token } = await this.authService.login(
      input.email,
      input.password,
      lang
    );
    return user;
  }

  async me(userId: string, lang: HeaderLanguage) {
    const { user, token } = await this.authService.me(userId, lang);
    return user;
  }

  async forgetPassword(email: string, lang: HeaderLanguage) {
    return await this.forgetPasswordService.forgetPassword(email, lang);
  }

  async resetPassword(input: ResetPasswordInput, lang: HeaderLanguage) {
    await this.resetPasswordService.resetPassword(input, lang);
    return true;
  }

  async changePassword(
    userId: string,
    data: ChangePasswordInput,
    lang: HeaderLanguage
  ) {
    await this.changePasswordService.changePassword(userId, data, lang);
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
