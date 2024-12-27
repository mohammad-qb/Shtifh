import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmExpressCarWashOrderEntity {
  @Field(() => String, { nullable: true })
  paymentUrl!: string | null;
}
