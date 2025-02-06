import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CarOrderLog } from '@prisma/client';
import { CarOrderLogStatus } from '@shtifh/helpers';

registerEnumType(CarOrderLogStatus, { name: 'CarOrderLogStatus' });

@ObjectType()
export class PrismaCarOrderLogEntity implements CarOrderLog {
  @Field(() => CarOrderLogStatus)
  status!: CarOrderLogStatus;

  @Field(() => String, { nullable: true })
  note!: string | null;

  @Field(() => Date)
  createdAt!: Date;
}
