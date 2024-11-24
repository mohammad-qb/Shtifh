import { Injectable, Logger } from '@nestjs/common';
import { HeaderLanguage } from '@shtifh/decorators';
import { HttpErrorsService } from '@shtifh/exception-service';
import { PrismaService } from '@shtifh/prisma-service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ForgetPasswordService {
  private logger = new Logger(ForgetPasswordService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shtifaa101@gmail.com', // Your Gmail address
        pass: 'kqri nhqw fwlh ilec', // Your Gmail password or App-specific password
      },
    });
  }

  /**
   * Initiates the password reset process by generating a reset code and sending it to the user's email.
   *
   * @param {string} email - The email address of the user requesting the password reset.
   * @param {HeaderLanguage} lang - The language preference for any error messages.
   * @return {Promise<boolean>} - Returns a promise that resolves to true if the process is successful.
   */
  async forgetPassword(email: string, lang: HeaderLanguage) {
    this.logger.log(`Forget password for user ${email}`);

    const user = await this.prismaService.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });
    if (!user) throw this.httpErrorsService.userNotFound(email, lang);

    const code = Math.floor(Math.random() * 1000000).toString();

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { reset_password_code: code },
    });

    const mailOptions = {
      from: 'shtifaa101@gmail.com', // Sender address
      to: user.email,
      subject: 'Reset Password',
      text: code,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }

    return true;
  }
}
