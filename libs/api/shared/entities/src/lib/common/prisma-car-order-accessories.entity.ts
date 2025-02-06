import { Int, Field, ObjectType } from '@nestjs/graphql';
import { CarOrderAccessories } from '@prisma/client';

@ObjectType()
export class PrismaCarOrderAccessoriesEntity implements CarOrderAccessories {
  @Field(() => String)
  accessoryId!: string;

  @Field(() => Int)
  quantity!: number;
}
