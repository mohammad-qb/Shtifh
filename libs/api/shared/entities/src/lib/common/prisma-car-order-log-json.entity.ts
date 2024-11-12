import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CarOrderLogStatus } from '@shtifh/helpers';

registerEnumType(CarOrderLogStatus, { name: 'CarOrderLogStatus' });

@ObjectType()
export class PrismaCarOrderLogJsonEntity {
  @Field(() => CarOrderLogStatus)
  status!: CarOrderLogStatus;

  @Field(() => Date)
  createdAt!: Date;
}
