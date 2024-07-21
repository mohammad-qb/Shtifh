import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UserService } from '@shtifh/user-service';

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

    if (!user) throw new BadRequestException('user_wrong');
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
}
