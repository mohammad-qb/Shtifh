import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AgentWalletSummary } from '@prisma/client';

@ObjectType()
export class PrismaAgentWalletSummaryEntity implements AgentWalletSummary {
  @Field(() => Float)
  total_tips!: number;

  @Field(() => Float)
  total_orders_earn!: number;
}
