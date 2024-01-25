import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

  async me(userId: number) {
    const user = await this.model.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        mobile: true,
        role: true,
        customer: {
          select: { id: true, image_url: true },
        },
      },
    });

    if (!user) throw new BadRequestException('user_wrong');

    const token = await this.userHelper.jwt.signJwt({
      email: user.email,
      full_name: user.full_name,
      id: user.customer?.id || 0,
      role: user.role,
      userId: user.id,
    });

    return { user, token };
  }
}
