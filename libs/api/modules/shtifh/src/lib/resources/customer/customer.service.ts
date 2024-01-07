import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CustomerShtifhService {
  private logger = new Logger(CustomerShtifhService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.customer;
  }

  async me(token: string) {
    console.log({ token });
    return await this.model.findFirst({ where: { id: 1 } });
  }
}
