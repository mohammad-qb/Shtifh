import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

class OrderCityDataEntity {
  @ApiProperty()
  name!: string;
}

class OrderServiceDataEntity {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}

class OrderCarDataEntity {
  @ApiProperty({ enum: $Enums.CarColor })
  color!: $Enums.CarColor;

  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}

export class OrdersDataEntity {
  @ApiProperty()
  address!: string;

  @ApiProperty()
  id!: number;

  @ApiProperty({ nullable: true })
  note!: string;

  @ApiProperty()
  date!: string;

  @ApiProperty({ type: OrderCityDataEntity })
  city!: OrderCityDataEntity;

  @ApiProperty({ type: OrderCarDataEntity })
  car!: OrderCarDataEntity;

  @ApiProperty({ type: OrderServiceDataEntity })
  service!: OrderServiceDataEntity;
}

export class ListOrdersEntity {
  @ApiProperty({ type: OrdersDataEntity, isArray: true })
  results!: OrdersDataEntity[];
}
