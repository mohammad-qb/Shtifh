import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Agent } from '@prisma/client';
import { PrismaAgentWalletSummaryJsonEntity } from './common/prisma-agent-wallet-summary-json.entity';

@ObjectType()
export class AgentEntity implements Agent {
  @Field(() => String)
  id!: string;

  @Field(() => [Int])
  position!: number[];

  @Field(() => Float)
  salary!: number;

   @Field(() => Boolean)
  is_available!: boolean;

   @Field(() => Boolean)
  is_busy!: boolean;

  @Field(() => [Float])
  coordinates!: number[];

  @Field(() => String)
  color!: string;

  @Field(() => Date)
  start_work_date!: Date;

  @Field(() => PrismaAgentWalletSummaryJsonEntity)
  wallet_summary!: PrismaAgentWalletSummaryJsonEntity;

  @Field(() => String)
  userId!: string;
}
