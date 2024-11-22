import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ExpressCrWashOrder } from '@prisma/client';
import { PrismaCarOrderLogJsonEntity } from './common/prisma-car-order-log-json.entity';

@ObjectType()
export class ExpressCatWashOrderEntity implements ExpressCrWashOrder {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  ref_number!: string;

  @Field(() => Float)
  fees!: number;

  @Field(() => Int)
  tips!: number;

  @Field(() => [PrismaCarOrderLogJsonEntity])
  logs!: PrismaCarOrderLogJsonEntity[];

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

  @Field(() => String, { nullable: true })
  agentId!: string | null;
}
