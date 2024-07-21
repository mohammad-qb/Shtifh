import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CustomerResourceService {
  private logger = new Logger(CustomerResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.customer;
  }

  async list() {
    const customers = await this.model.findMany({
      include: { user: true, cars: { include: { model: true } } },
    });
    return { result: customers };
  }

  async switchBlock(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException('user_wrong');

    await this.prismaService.user.update({
      where: { id: userId },
      data: { is_blocked: !user.is_blocked },
    });
  }
}
