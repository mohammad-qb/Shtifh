import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Agent } from '@prisma/client';
import { PrismaAgentWalletSummaryEntity } from './common/prisma-agent-wallet-summary.entity';

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

  @Field(() => PrismaAgentWalletSummaryEntity)
  wallet_summary!: PrismaAgentWalletSummaryEntity;

  @Field(() => String)
  userId!: string;
}
