import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client';
import { CarServiceEntity } from './car-service.entity';
import { CarEntity } from './car.entity';
import { CustomerEntity } from './customer.entity';
import { EmployeeEntity } from './employee.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  canceled_note!: string | null;

  @ApiProperty()
  canceled_by!: $Enums.Role;

  @ApiProperty()
  accessoriesIds!: string[];

  @ApiProperty({ default: false })
  is_canceled!: boolean | null;

  @ApiProperty()
  is_done!: boolean;

  @ApiProperty()
  fees!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  ref_number!: string;

  @ApiProperty()
  date!: Date;

  @ApiProperty()
  time!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  tip!: number;

  @ApiProperty({ nullable: true })
  note!: string | null;

  @ApiProperty({ nullable: true })
  paid!: boolean | null;

  @ApiProperty({ enum: $Enums.orderType })
  type!: $Enums.orderType;

  @ApiProperty()
  car_service!: CarServiceEntity;

  @ApiProperty()
  car!: CarEntity;

  @ApiProperty()
  customer!: CustomerEntity;

  @ApiProperty({ nullable: true })
  employee!: EmployeeEntity;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  carId!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty({ nullable: true })
  employeeId!: string | null;

  @ApiProperty()
  carServiceId!: string;

  @ApiProperty()
  carModelServiceId!: string;

  @ApiProperty()
  cityId!: string;

  @ApiProperty()
  lat_lng!: string[];
}
