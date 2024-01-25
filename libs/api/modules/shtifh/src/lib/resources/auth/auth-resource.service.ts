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

@Injectable()
export class AuthResourceService {
  private logger = new Logger(AuthResourceService.name);
  private userHelper;
  private model;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {
    this.model = prismaService.user;
    this.userHelper = userService.resources;
  }

  async register(args: RegisterDto) {
    const user = await this.model.findFirst({ where: { email: args.email } });

    if (user) throw new BadRequestException('user_exist');

    const passwordCrypt = await this.userHelper.crypt.cryptPassword(
      args.password
    );

    const registerUser = await this.model.create({
      data: {
        ...{ ...args, password: passwordCrypt },
        customer: {
          create: {
            image_url: '',
          },
        },
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        mobile: true,
        password: true,
        role: true,
        customer: {
          select: {
            id: true,
            image_url: true,
          },
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
      id: newUser.customer?.id || 0,
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
        customer: {
          select: {
            id: true,
            image_url: true,
          },
        },
      },
    });

    if (!user) throw new BadRequestException('user_not_exist');
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
      id: user.customer?.id || 0,
    });

    return { user: newUser, token };
  }

  async forgetPassword(args: ForgetPasswordDto) {
    const user = await this.model.findFirst({ where: { email: args.email } });

    if (!user) throw new BadRequestException('user_wrong');

    const code = Math.floor(Math.random() * 1000000).toString();

    await this.model.update({
      where: { id: user.id },
      data: { reset_password_code: code },
    });

    //TODO: send email

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
