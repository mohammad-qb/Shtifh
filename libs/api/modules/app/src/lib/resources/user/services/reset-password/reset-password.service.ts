import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { ResetPasswordInput } from '../../inputs/reset-password.input';
import { HeaderLanguage } from '@shtifh/decorators';
import { UserService } from '@shtifh/user-service';

@Injectable()
export class ResetPasswordService {
  private logger = new Logger(ResetPasswordService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService,
    private readonly userService: UserService
  ) {}

  /**
   * Resets the password for a given user.
   *
   * @param {ResetPasswordInput} data - The input data required for resetting the password, including the user's email and new password.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @return {Promise<Object>} - A promise that resolves to the updated user object after the password has been successfully reset.
   * @throws Will throw an error if the user is not found.
   */
  async resetPassword(data: ResetPasswordInput, lang: HeaderLanguage) {
    this.logger.log(`Reset password for ${data.email}`);

    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });
    if (!user) throw this.httpErrorsService.userNotFound(data.email, lang);

    const newHashedPassword = await this.userService.cryptPassword(
      data.new_password
    );
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: newHashedPassword },
    });

    this.logger.log(`Password reset for ${data.email}`);
    return updatedUser;
  }
}
