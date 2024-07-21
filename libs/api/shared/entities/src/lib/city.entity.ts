import { ApiProperty } from '@nestjs/swagger';
import { CarServiceEntity } from './car-service.entity';

export class CityEntity {
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
