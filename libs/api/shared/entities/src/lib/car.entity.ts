import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Car } from '@prisma/client';
import { CustomerEntity } from './customer.entity';
import { OrderEntity } from './order.entity';

export class CarEntity implements Car {
  @ApiProperty()
  id!: number;

  @ApiProperty({ nullable: true })
  plate!: string | null;

  @ApiProperty()
  model!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty({ enum: $Enums.CarType })
  type!: $Enums.CarType;

  @ApiProperty({ enum: $Enums.CarColor })
  color!: $Enums.CarColor;

  @ApiProperty()
  customer!: CustomerEntity;

  @ApiProperty()
  orders!: OrderEntity[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  customerId!: number;
}
