import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';
import { SwitchLangDto } from './dto/switch-lang.dto';

@Injectable()
export class UserResourceService {
  private logger = new Logger(UserResourceService.name);
  private model;
  private userHelper;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {
    this.model = prismaService.user;
    this.userHelper = userService.resources;
  }

  async me(userId: string) {
    const user = await this.model.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        mobile: true,
        role: true,
        is_blocked: true,
        lang: true,
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

    if (!user) throw new BadRequestException('user_wrong');
    if (user.customer?.is_removed)
      throw new BadRequestException('user_not_exist');
    if (user.is_blocked) throw new UnauthorizedException('user_blocked');

    const token = await this.userHelper.jwt.signJwt({
      email: user.email,
      full_name: user.full_name,
      id:
        (user.role === 'EMPLOYEE' ? user.employee?.id : user.customer?.id) ||
        '',
      role: user.role,
      userId: user.id,
    });

    return { user, token };
  }

  async lang(args: SwitchLangDto, userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('user_not_exist');

    await this.prismaService.user.update({
      where: { id: userId },
      data: { lang: args.lang },
    });
    return { success: true };
  }
}
