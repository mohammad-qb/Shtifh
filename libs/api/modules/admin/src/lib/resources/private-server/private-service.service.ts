import { Injectable, Logger } from '@nestjs/common';
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
}
