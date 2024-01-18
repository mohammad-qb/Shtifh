import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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

    const password = await this.userHelper.crypt.cryptPassword(args.password);

    await this.model.create({
      data: {
        ...{ ...args, password },
        customer: {
          create: {
            image_url: '',
          },
        },
      },
    });

    return { success: true };
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
}
