import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService,
    private readonly userService: UserService
  ) {}

  async login(email: string, password: string, lang: HeaderLanguage) {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    if (!user) {
      throw this.httpErrorsService.invalidLoginCredential(email, lang);
    }

    const isPasswordValid =
      await this.userService.resources.crypt.isPasswordMatch(
        password,
        user.password
      );

    if (!isPasswordValid) {
      throw this.httpErrorsService.invalidPassword(lang);
    }

    return user;
  }

  async me(userId: string, lang: HeaderLanguage) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw this.httpErrorsService.userNotFound(userId, lang);
    }
    return user;
  }
}
