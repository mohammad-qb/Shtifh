import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarModelServiceDto } from './dto/create.dto';

@Injectable()
export class CarModelServiceService {
  private logger = new Logger(CarModelServiceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(args: CreateCarModelServiceDto) {
    const carService = await this.prismaService.carService.findFirst({
      where: { id: args.carServiceId },
    });

    if (!carService) throw new BadRequestException('Car service not exist');

    await this.prismaService.carModelService.create({
      data: args,
    });

    return { success: true };
  }
}
