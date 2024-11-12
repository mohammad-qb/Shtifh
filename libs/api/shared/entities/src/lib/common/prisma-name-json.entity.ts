import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PrismaNameJsonEntity{
  @Field(() => String)
  ar!: string;

  @Field(() => String)
  en!: string;

  @Field(() => String)
  he!: string;


}
