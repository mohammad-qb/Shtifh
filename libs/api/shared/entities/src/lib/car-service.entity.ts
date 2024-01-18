import { ApiProperty } from '@nestjs/swagger';
import { CarService } from '@prisma/client';
import { CarModelEntity } from './car-model.entity';
import { CityEntity } from './city.entity';
import { OrderEntity } from './order.entity';

export class CarServiceEntity implements CarService {
  cityId!: number | null;
  @ApiProperty()
  id!: number;

  @ApiProperty()
  active!: boolean;

  @ApiProperty()
  car_model!: CarModelEntity;

  @ApiProperty()
  cities!: CityEntity[];

  @ApiProperty()
  orders!: OrderEntity[];

  @ApiProperty()
  carModelId!: number;

  @ApiProperty()
  serviceGroupId!: number;
}
