import { ApiProperty } from '@nestjs/swagger';
import { CarModel } from '@prisma/client';
import { CityEntity } from './city.entity';
import { ServiceEntity } from './service.entity';

export class CarModelEntity implements CarModel {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  cityId!: number;

  @ApiProperty()
  city!: CityEntity;

  @ApiProperty()
  services!: ServiceEntity[];
}
