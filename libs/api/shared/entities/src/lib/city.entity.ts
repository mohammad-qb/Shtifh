import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { WorkTimeEntity } from './work-time.entity';
import { CarServiceEntity } from './car-service.entity';

export class CityEntity implements City {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  work_time!: WorkTimeEntity;

  @ApiProperty()
  car_services!: CarServiceEntity;

  @ApiProperty()
  carServiceId!: number;

  @ApiProperty()
  workTimeId!: number;
}
