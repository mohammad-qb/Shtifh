import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreatePrivateServiceDto } from './private-service.dto';

@Injectable()
export class PrivateServiceService {
  private logger = new Logger(PrivateServiceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(args: CreatePrivateServiceDto) {
    return await this.prismaService.privateService.create({
      data: args,
    });
  }

  async update(id: string, args: CreatePrivateServiceDto) {
    return await this.prismaService.privateService.update({
      where: { id },
      data: args,
    });
  }

  async list() {
    return await this.prismaService.privateService.findMany({});
  }

  async activation(id: string) {
    const data = await this.prismaService.privateService.findFirst({
      where: { id },
    });

    if (!data) throw new BadRequestException('not_exist');

    await this.prismaService.privateService.update({
      where: { id },
      data: { is_active: data.is_active },
    });

    return { success: true };
  }
}
