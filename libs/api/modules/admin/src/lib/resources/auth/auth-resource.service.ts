import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthResourceService {
  private logger = new Logger(AuthResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.user;
  }

  async register(args: RegisterDto) {
    const user = await this.model.findFirst({ where: { email: args.email } });

    if (user) throw new BadRequestException('user_exist');

    return await this.model.create({
      data: {
        email: args.email,
        full_name: args.full_name,
        mobile: args.mobile,
        password: args.password,
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

    if (!user) throw new BadRequestException('user_wrong');

    return { user };
  }
}
