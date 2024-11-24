import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { VerifyResetPasswordOtpInput } from '../../inputs/verify-reset-password-otp.input';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class VerifyResetPasswordOtpService {
  private logger = new Logger(VerifyResetPasswordOtpService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Verifies the reset password OTP code for a user.
   *
   * @param {VerifyResetPasswordOtpInput} data - The input data containing the user's email and reset password code.
   * @param {HeaderLanguage} lang - The language header to be used for error messages.
   * @return {Promise<User>} The user object if the OTP verification is successful.
   * @throws {UserNotFoundError} If the user with the provided email does not exist.
   * @throws {OtpIncorrectError} If the provided reset password code is incorrect.
   */
  async verifyResetPasswordOtp(
    data: VerifyResetPasswordOtpInput,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Verify reset password for ${data.email} with code ${data.reset_password_code}`
    );

    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });
    if (!user) throw this.httpErrorsService.userNotFound(data.email, lang);
    if (user.reset_password_code !== data.reset_password_code)
      throw this.httpErrorsService.otpIncorrect(data.reset_password_code, lang);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { reset_password_code: { unset: true } },
    });
    return user;
  }
}
