import { Field, ObjectType } from '@nestjs/graphql';
import { Name } from '@prisma/client';

@ObjectType()
export class PrismaNameEntity implements Name {
  @Field(() => String)
  ar!: string;

  @Field(() => String)
  en!: string;

  @Field(() => String)
  he!: string;
}
