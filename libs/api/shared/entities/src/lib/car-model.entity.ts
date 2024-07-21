import { ApiProperty } from '@nestjs/swagger';
import { CarServiceEntity } from './car-service.entity';

export class CarModelEntity {
  @ApiProperty()
  image_url!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  car_services!: CarServiceEntity[];
}
