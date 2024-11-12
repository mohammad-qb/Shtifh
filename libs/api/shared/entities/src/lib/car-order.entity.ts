


import { registerEnumType } from '@nestjs/graphql';
import { $Enums, CarOrder } from '@prisma/client';

import { Field } from 'formik';

registerEnumType($Enums.OrderStatus, {name: "OrderStatus"});

export class CarOrderEntity implements CarOrder {
  @Field(() => String)
  id!: string;

    @Field(() => String)
  ref_number!: string;

    @Field(() => $Enums.OrderStatus)
  status!: $Enums.OrderStatus;

    @Field(() => Date, {nullable: true})
  order_date!: Date | null;

    @Field(() => String, {nullable: true})
  order_time!: string | null;

    @Field(() => String)
  fees!: number;

    @Field(() => String)
  tips!: number;

    @Field(() => String)
  note!: string | null;

    @Field(() => String)
  address!: string;

    @Field(() => String)
  logs!: PrismaJson.CarOrderLogJson[];

    @Field(() => String)
  accessories!: PrismaJson.CarOrderAccessoriesJson[];

    @Field(() => String)
  type!: $Enums.OrderType;

    @Field(() => String)
  car_location!: string[];

    @Field(() => String)
  createdAt!: Date;

    @Field(() => String)
  updatedAt!: Date;

    @Field(() => String)
  carId!: string;

    @Field(() => String)
  customerId!: string;

    @Field(() => String)
  cityId!: string;

    @Field(() => String)
  serviceId!: string;

    @Field(() => String)
  employeeId!: string | null;


}
