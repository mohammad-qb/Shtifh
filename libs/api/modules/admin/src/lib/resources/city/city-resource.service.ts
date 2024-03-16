import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCityDro } from './dto/create-city.dto';
import { UpdateCityDro } from './dto/update-city.dto';

@Injectable()
export class CityResourceService {
  private logger = new Logger(CityResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.city;
  }

  async create(args: CreateCityDro) {
    const city = await this.model.create({ data: args });
    return { result: city };
  }

  async list() {
    const cities = await this.model.findMany({include:{
      car_services:{
        include:{
          car_model:{
            select:{
              name_he:true
              ,id:true,
              
            }
          },
          car_model_services:{
            include:{
              service:true,
               
            }
          }
        }
      }
    }});
    return { result: cities };
  }

  async retrieve(cityId: string) {
    const city = await this.model.findFirst({ where: { id: cityId } });
    return { result: city };
  }

  async update(cityId: string, args: UpdateCityDro) {
    const city = await this.model.update({
      where: { id: cityId },
      data: args,
    });

    return { result: city };
  }
}
