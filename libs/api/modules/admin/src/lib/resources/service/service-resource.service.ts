import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceResourceService {
  private logger = new Logger(ServiceResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.service;
  }

  async create(args: CreateServiceDto) {
    const service = await this.model.create({
      data: args,
    });

    return { result: service };
  }

  async list() {
    const services = await this.model.findMany();
    return { result: services };
  }

  async update(serviceId: number, args: UpdateServiceDto) {
    const service = await this.model.update({
      where: { id: serviceId },
      data: args,
    });

    return { result: service };
  }
}
