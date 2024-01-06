import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CityShtifhService {
  private logger = new Logger(CityShtifhService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.city;
  }

  async list() {
    return this.model.findMany();
  }
}
