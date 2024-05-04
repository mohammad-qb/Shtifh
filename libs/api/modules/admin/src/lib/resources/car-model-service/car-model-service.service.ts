import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarModelServiceDto } from './dto/create.dto';
import { UpdateCarModelServiceDto } from './dto/update.dto';

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

  async update(args: UpdateCarModelServiceDto) {
    const carModelService = await this.prismaService.carModelService.findFirst({
      where: { id: args.carModelServicesId },
    });

    if (!carModelService)
      throw new BadRequestException('Car service not exist');

    await this.prismaService.carModelService.update({
      where: { id: args.carModelServicesId },
      data: {
        fees: args.fees,
      },
    });

    return { success: true };
  }

  async delete(id: string) {
    const carModelService = await this.prismaService.carModelService.findFirst({
      where: { id },
    });

    if (!carModelService)
      throw new BadRequestException('Car service not exist');

    await this.prismaService.carModelService.delete({
      where: { id },
    });

    return { success: true };
  }
}
