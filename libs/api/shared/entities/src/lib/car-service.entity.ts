import { ApiProperty } from '@nestjs/swagger';
import { CarModelEntity } from './car-model.entity';
import { CityEntity } from './city.entity';
import { OrderEntity } from './order.entity';

export class CarServiceEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  book_rate!: number[];

  @ApiProperty()
  active!: boolean;

  @ApiProperty()
  car_model!: CarModelEntity;

  @ApiProperty()
  cities!: CityEntity[];

  @ApiProperty()
  orders!: OrderEntity[];

  @ApiProperty()
  cityId!: string | null;

  @ApiProperty()
  carModelId!: string;

  @ApiProperty()
  serviceGroupId!: string;
}
