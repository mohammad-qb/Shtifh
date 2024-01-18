import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client';
import { CarServiceEntity } from './car-service.entity';
import { CarEntity } from './car.entity';
import { CustomerEntity } from './customer.entity';
import { EmployeeEntity } from './employee.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  ref_number!: string;

  @ApiProperty()
  date!: Date;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  address!: string;

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
  carId!: number;

  @ApiProperty()
  customerId!: number;

  @ApiProperty({ nullable: true })
  employeeId!: number | null;

  @ApiProperty()
  carServiceId!: number;

  carModelServiceId!: number;
  cityId!: number;
}
