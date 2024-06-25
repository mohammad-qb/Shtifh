import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { CarServiceEntity } from './car-service.entity';

export class CityEntity implements City {
  active!: boolean | null;
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  car_services!: CarServiceEntity;

  @ApiProperty()
  carServiceId!: string;

  @ApiProperty()
  workTimeId!: string;
}
