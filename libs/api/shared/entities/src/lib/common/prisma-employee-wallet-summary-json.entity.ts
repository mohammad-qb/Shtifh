import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrismaEmployeeWalletSummaryJsonEntity {
  @Field(() => Float)
  total_tips!: number;

  @Field(() => Float)
  total_orders_earn!: number;
}
