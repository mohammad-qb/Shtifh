import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Car } from '@prisma/client';
import { CustomerEntity } from './customer.entity';
import { OrderEntity } from './order.entity';

export class CarEntity {
  // implements Car
  @ApiProperty({ nullable: true })
  building_number!: string | null;

  @ApiProperty()
  cityId!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty({ nullable: true })
  plate!: string | null;

  @ApiProperty()
  carModelId!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  name!: string;

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
  customerId!: string;
}
