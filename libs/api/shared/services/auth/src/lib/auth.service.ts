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

  /**
   * Authenticates a user using their email and password.
   *
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The password provided by the user.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @return {Promise<Object>} Returns a promise that resolves to the user object if authentication is successful.
   * @throws {Error} Throws an error if the email is not found or the password is invalid.
   */
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

  /**
   * Fetches a user by their user ID and returns the user details.
   * If the user is not found, an error is thrown.
   *
   * @param {string} userId - The ID of the user to fetch.
   * @param {HeaderLanguage} lang - The language header used for error messaging.
   * @return {Promise<Object>} The user details.
   * @throws {Error} If the user is not found.
   */
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
