import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create.dto';

@Injectable()
export class AuthResourceService {
  private logger = new Logger(AuthResourceService.name);
  private model;
  private userHelper;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {
    this.model = prismaService.admin;
    this.userHelper = userService.resources;
  }

  async login(args: LoginDto) {
    const admin = await this.model.findFirst({
      where: { email: args.email },
    });

    if (!admin) throw new BadRequestException('user_wrong');

    const isPasswordMatch = await this.userHelper.crypt.isPasswordMatch(
      args.password,
      admin.password
    );

    if (!isPasswordMatch) throw new BadRequestException('password_wrong');

    const token = await this.userHelper.jwt.signJwt({
      email: admin.email,
      full_name: admin.full_name,
      id: admin.id,
      role: admin.role,
    });

    return { result: { admin, token } };
  }

  async create(args: CreateAdminDto) {
    const password = await this.userHelper.crypt.cryptPassword(args.password);
    return await this.model.create({ data: { ...args, password } });
  }
}
