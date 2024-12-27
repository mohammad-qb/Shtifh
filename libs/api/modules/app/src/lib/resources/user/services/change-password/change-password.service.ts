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

    const isPasswordValid =
      await this.userService.resources.crypt.isPasswordMatch(
        data.current_password,
        user.password
      );

    if (!isPasswordValid) throw this.httpErrorsService.invalidPassword(lang);

    const newHashedPassword =
      await this.userService.resources.crypt.cryptPassword(data.new_password);
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { password: newHashedPassword },
    });

    this.logger.log(`Password changed for user ${userId}`);
    return updatedUser;
  }
}
