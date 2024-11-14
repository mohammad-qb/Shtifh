import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UpdateNormalCarOrderEntity {
  @Field(() => String, {nullable: true})
  paymentLink!: string | null
}
