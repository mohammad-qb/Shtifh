import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';

@Injectable()
export class CarModelResourceService {
  private logger = new Logger(CarModelResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.carModel;
  }

  async create(args: CreateCarModelDto) {
    const carModel = await this.model.create({ data: args });
    return { result: carModel };
  }

  async list() {
    const carModels = await this.model.findMany();
    return { result: carModels };
  }

  async update(carModelId: number, args: UpdateCarModelDto) {
    const carModel = await this.model.update({
      where: { id: carModelId },
      data: args,
    });

    return { result: carModel };
  }
}
