import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class EmployeeResourceService {
  private logger = new Logger(EmployeeResourceService.name);
  private model;
  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.order;
  }

  async orders(employeeId: string) {
    const results = await this.model.findMany({
      where: { employeeId, paid: true },
      include: {
        city: true,
        customer: { include: { user: true } },
        car: { include: { model: true } },
        service: { include: { service: true } },
      },
    });

    return { result: results };
  }
}
