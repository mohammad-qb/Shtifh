import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Employee } from '@prisma/client';
import { PrismaEmployeeWalletSummaryJsonEntity } from './common/prisma-employee-wallet-summary-json.entity';

@ObjectType()
export class EmployeeEntity implements Employee {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  position!: string;

  @Field(() => Float)
  salary!: number;

  @Field(() => String)
  color!: string;

  @Field(() => Date)
  start_work_date!: Date;

  @Field(() => PrismaEmployeeWalletSummaryJsonEntity)
  wallet_summary!: PrismaEmployeeWalletSummaryJsonEntity;

  @Field(() => String)
  userId!: string;
}
