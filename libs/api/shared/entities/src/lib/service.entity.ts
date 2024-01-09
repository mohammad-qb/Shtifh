import { ApiProperty } from '@nestjs/swagger';
import { Service } from '@prisma/client';
import { CarModelEntity } from './car-model.entity';
import { CityEntity } from './city.entity';
import { OrderEntity } from './order.entity';

export class ServiceEntity implements Service {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty({ nullable: true })
  cityId!: number | null;

  @ApiProperty()
  carModelId!: number;

  @ApiProperty()
  car_model!: CarModelEntity;

  @ApiProperty()
  city!: CityEntity;

  @ApiProperty()
  orders!: OrderEntity;
}
