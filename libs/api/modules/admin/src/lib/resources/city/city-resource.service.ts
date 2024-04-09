import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCityDro } from './dto/create-city.dto';
import { UpdateCityDro } from './dto/update-city.dto';
import { CreateUnavailableSlot } from './dto/create-unavailable-slot.dto';
import moment from 'moment';
import { $Enums } from '@prisma/client';
import { UpdateCityDayDto } from './dto/update-city-day.dto';

@Injectable()
export class CityResourceService {
  private logger = new Logger(CityResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.city;
  }

  async create(args: CreateCityDro) {
    const city = await this.model.create({ data: {...args, WorkTime: {createMany: {
      data: [{
        day: 'FRIDAY',
        start_time: '08:00',
        end_time: '22:00',
        is_day_off: true
      }, 
      {
        day: 'MONDAY',
        start_time: '08:00',
        end_time: '22:00',
      },
      {
        day: 'SATURDAY',
        start_time: '08:00',
        end_time: '22:00',
        is_day_off: true
      },
      {
        day: 'SUNDAY',
        start_time: '08:00',
        end_time: '22:00',
      },
      {
        day: 'THURSDAY',
        start_time: '08:00',
        end_time: '22:00',
      },
      {
        day: 'TUESDAY',
        start_time: '08:00',
        end_time: '22:00',
      },
      {
        day: 'WEDNESDAY',
        start_time: '08:00',
        end_time: '22:00',
      }
    ]
    }}},  });
    return { result: city };
  }

  async list() {
    const cities = await this.model.findMany({include:{
      WorkTime: true,
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
          },

        },
      }
    }});
    return { result: cities };
  }

  async retrieve(cityId: string) {
    const city = await this.model.findFirst({ where: { id: cityId } });
    return { result: city };
  }

  async update(cityId: string, args: UpdateCityDro) {
    const city = await this.model.findFirst({where: {id: cityId}});

    if(!city) throw new BadRequestException('City not exist');

   const result = await this.model.update({
      where: { id: cityId },
      data: args,
    });

    return { result };
  }

  async unavailableSlot(args: CreateUnavailableSlot){
    const dayOfWeek = moment(args.date).format('dddd').toUpperCase();

    const work = await this.prismaService.workTime.findFirst({where: {cityId: args.cityId, day: dayOfWeek as $Enums.Day}});

    if(!work) throw new BadRequestException('No Work Time');
    
    return await this.prismaService.unavailableSlot.create({
      data: {
        date: new Date(args.date),
        end_time: args.end_time,
        start_time: args.start_time,
        workTimeId: work?.id
      }
    })
  }

  async switchDay(id: string){
    const work = await this.prismaService.workTime.findFirst({where: {id}});

    if(!work) throw new BadRequestException('No Work');

    await this.prismaService.workTime.update({where: {id}, data: {is_day_off: !work.is_day_off}})
    return {success: true};
  }

  async updateDay(args: UpdateCityDayDto){
    const work = await this.prismaService.workTime.findFirst({where: {id: args.workId}});

    if(!work) throw new BadRequestException('No work');

    await this.prismaService.workTime.update({where: {id: args.workId}, data: {
      end_time: args.end_time,
      start_time: args.start_time
    }});

    return {success: true}
  }
}
