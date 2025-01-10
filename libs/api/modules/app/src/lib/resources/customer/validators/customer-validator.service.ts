import { Injectable, Logger } from '@nestjs/common';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { User } from '@prisma/client';

@Injectable()
export class CustomerValidatorService {
  private logger = new Logger(CustomerValidatorService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Validates and retrieves a customer by their user ID.
   *
   * @param {string} userId - The unique identifier of the user to validate.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @return {Promise<User>} The validated user object if the user exists.
   * @throws Will throw an error if the user is not found.
   */
  async validateCustomerByUserId(
    userId: string,
    lang: HeaderLanguage
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw this.httpErrorsService.userNotFound(userId, lang);
    return user;
  }

  /**
   * Validates the uniqueness of a customer's email by checking if the provided email
   * already exists in the database. If the email is found, an exception is thrown.
   *
   * @param {string} email - The email address to be checked for uniqueness.
   * @param {HeaderLanguage} lang - The language header used to customize the error message.
   * @return {Promise<boolean>} - A promise that resolves to true if the email is unique.
   */
  async validateCustomerEmailUniqueness(
    email: string,
    lang: HeaderLanguage
  ): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });
    if (user) {
      throw this.httpErrorsService.emailAlreadyTaken(email, lang);
    }
    return true;
  }
}
