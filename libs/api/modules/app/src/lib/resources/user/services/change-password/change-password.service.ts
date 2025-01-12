import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';
import { ChangePasswordInput } from '../../inputs/change-password.input';
import { HttpErrorsService } from '@shtifh/exception-service';

@Injectable()
export class ChangePasswordService {
  private logger = new Logger(ChangePasswordService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService,
    private readonly userService: UserService
  ) {}

  /**
   * Changes the password for a user identified by their user ID.
   *
   * @param {string} userId - The unique identifier of the user whose password is being updated.
   * @param {ChangePasswordInput} data - An object containing the current password and the new password.
   * @param {HeaderLanguage} lang - The language header used for error messaging and localization.
   * @return {Promise<object>} Returns a Promise resolving to the updated user object with the new password.
   * @throws Will throw an error if the user is not found, the current password is incorrect, or if any database operation fails.
   */
  async changePassword(
    userId: string,
    data: ChangePasswordInput,
    lang: HeaderLanguage
  ) {
    this.logger.log(`Change password for user ${userId}`);

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw this.httpErrorsService.userNotFound(userId, lang);

    const isPasswordValid = await this.userService.isPasswordMatch(
      data.current_password,
      user.password
    );

    if (!isPasswordValid) throw this.httpErrorsService.invalidPassword(lang);

    const newHashedPassword = await this.userService.cryptPassword(
      data.new_password
    );
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { password: newHashedPassword },
    });

    this.logger.log(`Password changed for user ${userId}`);
    return updatedUser;
  }
}
