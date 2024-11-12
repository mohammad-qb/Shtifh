import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrismaCarOrderAccessoriesJsonEntity {
  @Field(() => String)
  accessoryId!: string;

  @Field(() => Int)
  quantity!: number;
}
