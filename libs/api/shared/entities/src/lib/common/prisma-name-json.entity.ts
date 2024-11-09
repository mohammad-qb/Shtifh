import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PrismaNameJsonEntity implements PrismaJson.NameJson {
  @Field(() => String)
  ar!: string;
  
  @Field(() => String)
  en!: string;
  
  @Field(() => String)
  he!: string;
  
  
}