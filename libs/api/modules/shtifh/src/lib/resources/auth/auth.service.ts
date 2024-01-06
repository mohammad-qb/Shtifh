import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthShtifhService {
  private logger = new Logger(AuthShtifhService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.user;
  }

  async register(args: RegisterDto) {
    const user = await this.model.findFirst({ where: { email: args.email } });

    if (user) throw new BadRequestException('user_exist');

    return await this.model.create({
      data: {
        ...args,
        customer: {
          create: {
            image_url: '',
          },
        },
      },
    });
  }

  async login(args: LoginDto) {
    const user = await this.model.findFirst({
      where: { email: args.email, password: args.password },
    });

    if (!user) throw new BadRequestException('user_auth_wrong');

    return { user };
  }
}
