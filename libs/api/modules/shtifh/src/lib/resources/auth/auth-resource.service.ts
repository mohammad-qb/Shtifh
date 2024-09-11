import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { generateImageUrl } from './helper/generate-image-url';
import { FCMService } from '@shtifh/fcm-service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthResourceService {
  private logger = new Logger(AuthResourceService.name);
  private userHelper;
  private model;
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly fcmService: FCMService
  ) {
    this.model = prismaService.user;
    this.userHelper = userService.resources;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shtifaa101@gmail.com', // Your Gmail address
        pass: 'kqri nhqw fwlh ilec', // Your Gmail password or App-specific password
      },
    });
  }

  async register(args: RegisterDto) {
    const user = await this.model.findFirst({ where: { email: args.email } });

    if (user) throw new BadRequestException('user_exist');

    const passwordCrypt = await this.userHelper.crypt.cryptPassword(
      args.password
    );
    const { gender, cityId, ...rest } = args;

    const registerUser = await this.model.create({
      data: {
        ...{ ...rest, password: passwordCrypt },
        customer: {
          create: {
            gender,
            cityId,
            image_url: generateImageUrl(
              args.gender,
              args.full_name.split(' ')[0]
            ),
          },
        },
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        mobile: true,
        password: true,
        lang: true,
        role: true,
        customer: {
          select: {
            id: true,
            gender: true,
            image_url: true,
          },
        },
        employee: {
          select: { id: true },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = registerUser;

    const token = await this.userHelper.jwt.signJwt({
      email: newUser.email,
      full_name: newUser.full_name,
      userId: newUser.id,
      role: newUser.role,
      id: newUser.customer?.id || '',
    });

    await this.fcmService.send({
      data: {},
      topic: `user-${registerUser.id}`,
      notification: {
        title:
          registerUser.lang === 'AR'
            ? 'مرحبا بك'
            : registerUser.lang === 'EN'
            ? 'Hi, Welcome'
            : 'שלום, ברוך הבא',
        body:
          registerUser.lang === 'AR'
            ? 'مرحبا بك في التطبيق، Shtifa101.'
            : registerUser.lang === 'EN'
            ? 'Welcome to the app, Shtifa101.'
            : 'ברוך הבא לאפליקציה، Shtifa101.',
      },
    });

    await this.prismaService.notification.create({
      data: {
        content_ar: 'مرحبا بك في التطبيق، Shtifa101.',
        content_en: 'Welcome to the app, Shtifa101.',
        content_he: 'ברוך הבא לאפליקציה، Shtifa101.',
        userId: registerUser.id,
        is_read: [],
        type: 'DEFAULT',
      },
    });
    return { user: newUser, token };
  }

  async login(args: LoginDto) {
    const user = await this.model.findFirst({
      where: { email: args.email },
      select: {
        id: true,
        full_name: true,
        email: true,
        mobile: true,
        password: true,
        role: true,
        lang: true,
        is_blocked: true,
        customer: {
          select: {
            id: true,
            gender: true,
            image_url: true,
            is_removed: true,
          },
        },
        employee: {
          select: { id: true },
        },
      },
    });

    console.log({ user });
    if (!user) throw new BadRequestException('user_not_exist');
    if (user.customer?.is_removed)
      throw new BadRequestException('user_not_exist');
    if (user.is_blocked) throw new UnauthorizedException('user_blocked');

    const isPasswordMatch = await this.userHelper.crypt.isPasswordMatch(
      args.password,
      user.password
    );

    if (!isPasswordMatch) throw new BadRequestException('password_wrong');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = user;

    const token = await this.userHelper.jwt.signJwt({
      email: user.email,
      full_name: user.full_name,
      userId: user.id,
      role: user.role,
      id:
        (user.role === 'EMPLOYEE' ? user.employee?.id : user.customer?.id) ||
        '',
    });

    return { user: newUser, token };
  }

  async forgetPassword(args: ForgetPasswordDto) {
    const user = await this.model.findFirst({ where: { email: args.email } });

    if (!user) throw new BadRequestException('user_wrong');
    if (user.is_blocked) throw new UnauthorizedException('user_blocked');

    const code = Math.floor(Math.random() * 1000000).toString();

    await this.model.update({
      where: { id: user.id },
      data: { reset_password_code: code },
    });

    //TODO: send email
    const mailOptions = {
      from: 'your-email@gmail.com', // Sender address
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

    return { success: true };
  }

  async validateCode(args: ValidateCodeDto) {
    const user = await this.model.findFirst({
      where: { reset_password_code: args.code },
    });

    if (!user) throw new BadRequestException('code_wrong');

    const token = await this.userHelper.jwt.signJwt(
      {
        email: user.email,
        full_name: user.full_name,
        id: user.id,
        role: user.role,
        userId: user.id,
      },
      '1h'
    );

    return {
      success: true,
      token,
    };
  }

  async resetPassword(args: ResetPasswordDto) {
    const payload = await this.userHelper.jwt.verify(args.token);

    if (!payload) throw new UnauthorizedException('unauthorized');

    const newPassword = await this.userHelper.crypt.cryptPassword(
      args.password
    );

    await this.model.update({
      where: { id: payload.userId },
      data: {
        password: newPassword,
        reset_password_code: null,
      },
    });

    return { success: true };
  }
}
