import { registerEnumType, Field } from '@nestjs/graphql';
import { $Enums, CarOrder } from '@prisma/client';
import { PrismaCarOrderLogJsonEntity } from './common/prisma-car-order-log-json.entity';
import { PrismaCarOrderAccessoriesJsonEntity } from './common/prisma-car-order-accessories-json.entity';

registerEnumType($Enums.OrderStatus, { name: 'OrderStatus' });
registerEnumType($Enums.OrderType, { name: 'OrderType' });

export class CarOrderEntity implements CarOrder {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  ref_number!: string;

  @Field(() => $Enums.OrderStatus)
  status!: $Enums.OrderStatus;

  @Field(() => Date, { nullable: true })
  order_date!: Date | null;

  @Field(() => String, { nullable: true })
  order_time!: string | null;

  @Field(() => String)
  fees!: number;

  @Field(() => String)
  tips!: number;

  @Field(() => String, {nullable: true})
  note!: string | null;

  @Field(() => String)
  address!: string;

  @Field(() => [PrismaCarOrderLogJsonEntity])
  logs!: PrismaCarOrderLogJsonEntity[];

  @Field(() => [PrismaCarOrderAccessoriesJsonEntity])
  accessories!: PrismaCarOrderAccessoriesJsonEntity[];

  @Field(() => $Enums.OrderType)
  type!: $Enums.OrderType;

  @Field(() => [String])
  car_location!: string[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => String)
  carId!: string;

  @Field(() => String)
  customerId!: string;

  @Field(() => String)
  cityId!: string;

  @Field(() => String)
  serviceId!: string;

  @Field(() => String, {nullable: true})
  employeeId!: string | null;
}
