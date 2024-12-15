import {
  Injectable,
  Logger
} from '@nestjs/common';
import {
  PrismaService
} from '@shtifh/prisma-service';

@Injectable()
export class AdminCreateCarBrandService {
  private logger = new Logger(AdminCreateCarBrandService.name);

  constructor(private readonly prismaService: PrismaService) {
  }

  async createCarBrand(data) {
    this.logger.log('Create a new Car Brand with data', data);
    const carBrand = await this.prismaService.carBrand.create({data: {
       ...data,
      }})
    this.logger.log(`Car Brand created with Id ${carBrand.id}`);
    return carBrand;
  }
}
