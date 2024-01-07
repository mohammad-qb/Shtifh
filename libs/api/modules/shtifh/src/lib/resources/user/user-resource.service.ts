import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class UserResourceService {
  private logger = new Logger(UserResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.user;
  }

  async me(userId: number) {
    const user = await this.model.findFirst({
      where: { id: userId },
      select: {
        email: true,
        full_name: true,
        mobile: true,
        role: true,
        customer: {
          select: { image_url: true },
        },
      },
    });

    return { user };
  }
}
