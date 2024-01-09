import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { ServiceEntity } from './service.entity';
import { CarModelEntity } from './car-model.entity';

export class CityEntity implements City {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  service!: ServiceEntity[];

  @ApiProperty()
  car_models!: CarModelEntity[];
}
