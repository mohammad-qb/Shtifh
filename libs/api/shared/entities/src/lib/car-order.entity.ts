import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { CarOrder } from '@prisma/client';
import { CarOrderType } from '@shtifh/helpers';
import { PrismaCarOrderAccessoriesJsonEntity } from './common/prisma-car-order-accessories-json.entity';
import { PrismaCarOrderLogJsonEntity } from './common/prisma-car-order-log-json.entity';

@ObjectType()
export class CarOrderEntity implements CarOrder {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  ref_number!: string;

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

  @Field(() => Int)
  type!: CarOrderType;

  @Field(() => [Float])
  coordinates!: number[];

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
  agentId!: string | null;
}
