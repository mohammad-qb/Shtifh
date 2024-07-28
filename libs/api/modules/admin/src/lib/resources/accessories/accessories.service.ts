import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateAccessoriesDto } from './dto/create.dto';
import { UpdateAccessoriesDto } from './dto/update.dto';

@Injectable()
export class AccessoriesResourceService {
  private logger = new Logger(AccessoriesResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(args: CreateAccessoriesDto) {
    const accessory = await this.prismaService.accessories.create({
      data: args,
    });
    return { result: accessory };
  }

  async list() {
    const accessories = await this.prismaService.accessories.findMany();
    return { results: accessories };
  }

  async active(id: string) {
    const result = await this.prismaService.accessories.findFirst({
      where: { id },
    });

    if (!result) throw new BadRequestException('accessory_not_exist');

    await this.prismaService.accessories.update({
      where: { id },
      data: { is_active: !result.is_active },
    });

    return { success: true };
  }

  async update(id: string, args: UpdateAccessoriesDto) {
    const result = await this.prismaService.accessories.findFirst({
      where: { id },
    });
    if (!result) throw new BadRequestException('accessory_not_exist');

    const updatedResult = await this.prismaService.accessories.update({
      where: { id },
      data: args,
    });

    return { result: updatedResult };
  }
}
