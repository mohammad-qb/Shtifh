import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrismaAgentWalletSummaryJsonEntity {
  @Field(() => Float)
  total_tips!: number;

  @Field(() => Float)
  total_orders_earn!: number;
}
